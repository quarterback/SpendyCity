import { Storage } from "@google-cloud/storage";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

export const objectStorageClient = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token",
      },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

export class ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, ObjectNotFoundError.prototype);
  }
}

export function getPrivateObjectDir(): string {
  const dir = process.env.PRIVATE_OBJECT_DIR ?? "";
  if (!dir) {
    throw new Error(
      "PRIVATE_OBJECT_DIR is not set. Provision object storage first.",
    );
  }
  return dir;
}

export function parseObjectPath(rawPath: string): {
  bucketName: string;
  objectName: string;
} {
  const path = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const parts = path.split("/");
  if (parts.length < 3) {
    throw new Error(`Invalid object path: ${rawPath}`);
  }
  return {
    bucketName: parts[1],
    objectName: parts.slice(2).join("/"),
  };
}

interface UploadInput {
  objectKey: string;
  bytes: Uint8Array;
  contentType: string;
}

export async function uploadPrivateObject(
  input: UploadInput,
): Promise<{ bucketName: string; objectName: string }> {
  const baseDir = getPrivateObjectDir().replace(/\/+$/, "");
  const fullPath = `${baseDir}/${input.objectKey.replace(/^\/+/, "")}`;
  const { bucketName, objectName } = parseObjectPath(fullPath);
  const bucket = objectStorageClient.bucket(bucketName);
  const file = bucket.file(objectName);
  await file.save(Buffer.from(input.bytes), {
    contentType: input.contentType,
    resumable: false,
  });
  return { bucketName, objectName };
}

export async function downloadPrivateObject(
  objectKey: string,
): Promise<{ bytes: Buffer; contentType: string }> {
  const baseDir = getPrivateObjectDir().replace(/\/+$/, "");
  const fullPath = `${baseDir}/${objectKey.replace(/^\/+/, "")}`;
  const { bucketName, objectName } = parseObjectPath(fullPath);
  const bucket = objectStorageClient.bucket(bucketName);
  const file = bucket.file(objectName);
  const [exists] = await file.exists();
  if (!exists) {
    throw new ObjectNotFoundError();
  }
  const [bytes] = await file.download();
  const [metadata] = await file.getMetadata();
  return {
    bytes,
    contentType:
      typeof metadata.contentType === "string"
        ? metadata.contentType
        : "application/octet-stream",
  };
}
