import { isTable, getTableColumns, getViewSelectedFields, is, Column, SQL, isView, eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import require$$0$3 from "events";
import require$$1$1 from "util";
import require$$0 from "crypto";
import require$$0$2 from "dns";
import require$$0$1 from "fs";
import require$$0$4 from "net";
import require$$1$2 from "tls";
import require$$0$6 from "path";
import require$$0$5 from "stream";
import require$$1$3 from "string_decoder";
import { pgTable, timestamp, text, index as index$2, uniqueIndex, integer as integer$1 } from "drizzle-orm/pg-core";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
const __vite_glob_0_0 = `## Headline

PCEF launches $20 million e-bike rebate program targeting low-income households

## What changed

- The City of Portland announced the Portland Rides E-Bike Rebate Program, described as a $20 million investment intended to provide over 6,000 standard, cargo, and adaptive e-bikes through December 2029 [Doc 2].
- The program is directed at low-income households, consistent with PCEF's statutory mandate to prioritize "low-income communities and communities of color," defined in the ordinance as "priority populations" [Doc 1].
- PCEF published baseline research on regenerative urban agriculture conducted in partnership with Portland State University, aimed at understanding how urban farming intersects with climate change, food access, and community well-being [Doc 2].
- The PCEF Committee has scheduled monthly public meetings through at least July 2026, with sessions on April 29, May 13, June 10, and July 8 [Doc 2].
- No news documents from the past 90 days were supplied beyond what appears on the program homepage; the corpus supporting this memo is thin.

## Numbers worth holding

| Figure | Value | Source |
|---|---|---|
| E-bike rebate program total investment | $20 million | [Doc 2] |
| E-bikes to be distributed through December 2029 | Over 6,000 | [Doc 2] |
| Clean energy surcharge rate on qualifying retail gross revenue | 1 percent | [Doc 1] |
| National gross revenue threshold triggering surcharge | $1 billion | [Doc 1] |
| Portland gross revenue threshold triggering surcharge | $500,000 | [Doc 1] |
| Climate Investment Plan term | 5 years | [Doc 1] |

## What to watch next

The e-bike program is the most concrete spending announcement visible in the supplied corpus, but the underlying disbursement mechanics, income verification procedures, and contractor arrangements are not documented in the materials provided. The regenerative urban agriculture research release may signal a future grant solicitation in that category. Readers should monitor upcoming PCEF Committee meetings, particularly the May 13 session, for any committee action on the Climate Investment Plan's next funding cycle. The corpus is thin; additional source documents would be needed to assess fund balance, administrative cost ratios, or grant pipeline status.

---
Ron Bronson / Public Capacity Lab / State Capacity AI`;
const __vite_glob_0_1 = "## Headline\n\nPortland Rental Services Office holds position with thin public documentation this week\n\n## What changed\n\n- The Rental Services Office (RSO) operates under the Portland Housing Bureau and runs a helpline providing technical assistance and information on landlord-tenant law; staff cannot provide legal advice [Doc 2].\n- The RSO administers several programs including Mandatory Renter Relocation Assistance, Application and Screening rules, Security Deposit rules, and the Residential Rental Registration Program [Doc 2].\n- Free landlord training sessions on Portland landlord-tenant law are scheduled through 2025 and 2026, offered virtually [Doc 2].\n- A public webinar on cost-based rental and limited-profit housing, using Vienna as a case study, is scheduled for May 7, 2026 [Doc 2].\n- The RSO's Rental Registration program connects to Chapter 7.02 of the Portland City Code, the Business License Law, which governs registration requirements; the law is characterized explicitly as revenue-generating, not regulatory [Doc 1].\n\n## Numbers worth holding\n\n| Figure | Value | Source |\n|---|---|---|\n| Contact number for RSO helpline | 503-823-4000 | [Doc 2] |\n| Relay Service number | 711 | [Doc 2] |\n| Business License Law chapter | Chapter 7.02, Portland City Code | [Doc 1] |\n\n*Note: No fee amounts, registration counts, revenue figures, or budget totals appear in the supplied documents. Those figures are omitted per sourcing constraints.*\n\n## What to watch next\n\nThe corpus here is thin. Neither document supplies fee schedules, annual registration counts, revenue collected, compliance rates, or RSO staffing and budget figures. A Landlord/Tenant Policy Analysis pre-proposal meeting was listed for January 6, 2026, but no outcome document was provided [Doc 2]. Observers should request the RSO's current fee schedule under Schedule R, any annual report from the Portland Housing Bureau, and minutes from the January 2026 pre-proposal meeting to establish a baseline for tracking this fund's fiscal performance.\n\n---\nRon Bronson / Public Capacity Lab / State Capacity AI";
var lib$1 = { exports: {} };
var defaults$3 = { exports: {} };
var pgTypes = {};
var postgresArray = {};
postgresArray.parse = function(source, transform2) {
  return new ArrayParser(source, transform2).parse();
};
class ArrayParser {
  constructor(source, transform2) {
    this.source = source;
    this.transform = transform2 || identity;
    this.position = 0;
    this.entries = [];
    this.recorded = [];
    this.dimension = 0;
  }
  isEof() {
    return this.position >= this.source.length;
  }
  nextCharacter() {
    var character = this.source[this.position++];
    if (character === "\\") {
      return {
        value: this.source[this.position++],
        escaped: true
      };
    }
    return {
      value: character,
      escaped: false
    };
  }
  record(character) {
    this.recorded.push(character);
  }
  newEntry(includeEmpty) {
    var entry;
    if (this.recorded.length > 0 || includeEmpty) {
      entry = this.recorded.join("");
      if (entry === "NULL" && !includeEmpty) {
        entry = null;
      }
      if (entry !== null) entry = this.transform(entry);
      this.entries.push(entry);
      this.recorded = [];
    }
  }
  consumeDimensions() {
    if (this.source[0] === "[") {
      while (!this.isEof()) {
        var char = this.nextCharacter();
        if (char.value === "=") break;
      }
    }
  }
  parse(nested) {
    var character, parser2, quote;
    this.consumeDimensions();
    while (!this.isEof()) {
      character = this.nextCharacter();
      if (character.value === "{" && !quote) {
        this.dimension++;
        if (this.dimension > 1) {
          parser2 = new ArrayParser(this.source.substr(this.position - 1), this.transform);
          this.entries.push(parser2.parse(true));
          this.position += parser2.position - 2;
        }
      } else if (character.value === "}" && !quote) {
        this.dimension--;
        if (!this.dimension) {
          this.newEntry();
          if (nested) return this.entries;
        }
      } else if (character.value === '"' && !character.escaped) {
        if (quote) this.newEntry(true);
        quote = !quote;
      } else if (character.value === "," && !quote) {
        this.newEntry();
      } else {
        this.record(character.value);
      }
    }
    if (this.dimension !== 0) {
      throw new Error("array dimension not balanced");
    }
    return this.entries;
  }
}
function identity(value) {
  return value;
}
var array$2 = postgresArray;
var arrayParser$2 = {
  create: function(source, transform2) {
    return {
      parse: function() {
        return array$2.parse(source, transform2);
      }
    };
  }
};
var DATE_TIME = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/;
var DATE = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/;
var TIME_ZONE = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/;
var INFINITY = /^-?infinity$/;
var postgresDate = function parseDate(isoDate) {
  if (INFINITY.test(isoDate)) {
    return Number(isoDate.replace("i", "I"));
  }
  var matches = DATE_TIME.exec(isoDate);
  if (!matches) {
    return getDate(isoDate) || null;
  }
  var isBC = !!matches[8];
  var year = parseInt(matches[1], 10);
  if (isBC) {
    year = bcYearToNegativeYear(year);
  }
  var month = parseInt(matches[2], 10) - 1;
  var day = matches[3];
  var hour = parseInt(matches[4], 10);
  var minute = parseInt(matches[5], 10);
  var second = parseInt(matches[6], 10);
  var ms2 = matches[7];
  ms2 = ms2 ? 1e3 * parseFloat(ms2) : 0;
  var date2;
  var offset = timeZoneOffset(isoDate);
  if (offset != null) {
    date2 = new Date(Date.UTC(year, month, day, hour, minute, second, ms2));
    if (is0To99(year)) {
      date2.setUTCFullYear(year);
    }
    if (offset !== 0) {
      date2.setTime(date2.getTime() - offset);
    }
  } else {
    date2 = new Date(year, month, day, hour, minute, second, ms2);
    if (is0To99(year)) {
      date2.setFullYear(year);
    }
  }
  return date2;
};
function getDate(isoDate) {
  var matches = DATE.exec(isoDate);
  if (!matches) {
    return;
  }
  var year = parseInt(matches[1], 10);
  var isBC = !!matches[4];
  if (isBC) {
    year = bcYearToNegativeYear(year);
  }
  var month = parseInt(matches[2], 10) - 1;
  var day = matches[3];
  var date2 = new Date(year, month, day);
  if (is0To99(year)) {
    date2.setFullYear(year);
  }
  return date2;
}
function timeZoneOffset(isoDate) {
  if (isoDate.endsWith("+00")) {
    return 0;
  }
  var zone = TIME_ZONE.exec(isoDate.split(" ")[1]);
  if (!zone) return;
  var type = zone[1];
  if (type === "Z") {
    return 0;
  }
  var sign = type === "-" ? -1 : 1;
  var offset = parseInt(zone[2], 10) * 3600 + parseInt(zone[3] || 0, 10) * 60 + parseInt(zone[4] || 0, 10);
  return offset * sign * 1e3;
}
function bcYearToNegativeYear(year) {
  return -(year - 1);
}
function is0To99(num) {
  return num >= 0 && num < 100;
}
var mutable = extend$2;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function extend$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
var extend$1 = mutable;
var postgresInterval = PostgresInterval;
function PostgresInterval(raw) {
  if (!(this instanceof PostgresInterval)) {
    return new PostgresInterval(raw);
  }
  extend$1(this, parse$6(raw));
}
var properties = ["seconds", "minutes", "hours", "days", "months", "years"];
PostgresInterval.prototype.toPostgres = function() {
  var filtered = properties.filter(this.hasOwnProperty, this);
  if (this.milliseconds && filtered.indexOf("seconds") < 0) {
    filtered.push("seconds");
  }
  if (filtered.length === 0) return "0";
  return filtered.map(function(property) {
    var value = this[property] || 0;
    if (property === "seconds" && this.milliseconds) {
      value = (value + this.milliseconds / 1e3).toFixed(6).replace(/\.?0+$/, "");
    }
    return value + " " + property;
  }, this).join(" ");
};
var propertiesISOEquivalent = {
  years: "Y",
  months: "M",
  days: "D",
  hours: "H",
  minutes: "M",
  seconds: "S"
};
var dateProperties = ["years", "months", "days"];
var timeProperties = ["hours", "minutes", "seconds"];
PostgresInterval.prototype.toISOString = PostgresInterval.prototype.toISO = function() {
  var datePart = dateProperties.map(buildProperty, this).join("");
  var timePart = timeProperties.map(buildProperty, this).join("");
  return "P" + datePart + "T" + timePart;
  function buildProperty(property) {
    var value = this[property] || 0;
    if (property === "seconds" && this.milliseconds) {
      value = (value + this.milliseconds / 1e3).toFixed(6).replace(/0+$/, "");
    }
    return value + propertiesISOEquivalent[property];
  }
};
var NUMBER = "([+-]?\\d+)";
var YEAR = NUMBER + "\\s+years?";
var MONTH = NUMBER + "\\s+mons?";
var DAY = NUMBER + "\\s+days?";
var TIME = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?";
var INTERVAL = new RegExp([YEAR, MONTH, DAY, TIME].map(function(regexString) {
  return "(" + regexString + ")?";
}).join("\\s*"));
var positions = {
  years: 2,
  months: 4,
  days: 6,
  hours: 9,
  minutes: 10,
  seconds: 11,
  milliseconds: 12
};
var negatives = ["hours", "minutes", "seconds", "milliseconds"];
function parseMilliseconds(fraction) {
  var microseconds = fraction + "000000".slice(fraction.length);
  return parseInt(microseconds, 10) / 1e3;
}
function parse$6(interval) {
  if (!interval) return {};
  var matches = INTERVAL.exec(interval);
  var isNegative = matches[8] === "-";
  return Object.keys(positions).reduce(function(parsed, property) {
    var position = positions[property];
    var value = matches[position];
    if (!value) return parsed;
    value = property === "milliseconds" ? parseMilliseconds(value) : parseInt(value, 10);
    if (!value) return parsed;
    if (isNegative && ~negatives.indexOf(property)) {
      value *= -1;
    }
    parsed[property] = value;
    return parsed;
  }, {});
}
var bufferFrom = Buffer.from || Buffer;
var postgresBytea = function parseBytea(input) {
  if (/^\\x/.test(input)) {
    return bufferFrom(input.substr(2), "hex");
  }
  var output = "";
  var i = 0;
  while (i < input.length) {
    if (input[i] !== "\\") {
      output += input[i];
      ++i;
    } else {
      if (/[0-7]{3}/.test(input.substr(i + 1, 3))) {
        output += String.fromCharCode(parseInt(input.substr(i + 1, 3), 8));
        i += 4;
      } else {
        var backslashes = 1;
        while (i + backslashes < input.length && input[i + backslashes] === "\\") {
          backslashes++;
        }
        for (var k = 0; k < Math.floor(backslashes / 2); ++k) {
          output += "\\";
        }
        i += Math.floor(backslashes / 2) * 2;
      }
    }
  }
  return bufferFrom(output, "binary");
};
var array$1 = postgresArray;
var arrayParser$1 = arrayParser$2;
var parseDate$1 = postgresDate;
var parseInterval = postgresInterval;
var parseByteA = postgresBytea;
function allowNull(fn) {
  return function nullAllowed(value) {
    if (value === null) return value;
    return fn(value);
  };
}
function parseBool$1(value) {
  if (value === null) return value;
  return value === "TRUE" || value === "t" || value === "true" || value === "y" || value === "yes" || value === "on" || value === "1";
}
function parseBoolArray(value) {
  if (!value) return null;
  return array$1.parse(value, parseBool$1);
}
function parseBaseTenInt(string2) {
  return parseInt(string2, 10);
}
function parseIntegerArray(value) {
  if (!value) return null;
  return array$1.parse(value, allowNull(parseBaseTenInt));
}
function parseBigIntegerArray(value) {
  if (!value) return null;
  return array$1.parse(value, allowNull(function(entry) {
    return parseBigInteger(entry).trim();
  }));
}
var parsePointArray = function(value) {
  if (!value) {
    return null;
  }
  var p = arrayParser$1.create(value, function(entry) {
    if (entry !== null) {
      entry = parsePoint(entry);
    }
    return entry;
  });
  return p.parse();
};
var parseFloatArray = function(value) {
  if (!value) {
    return null;
  }
  var p = arrayParser$1.create(value, function(entry) {
    if (entry !== null) {
      entry = parseFloat(entry);
    }
    return entry;
  });
  return p.parse();
};
var parseStringArray = function(value) {
  if (!value) {
    return null;
  }
  var p = arrayParser$1.create(value);
  return p.parse();
};
var parseDateArray = function(value) {
  if (!value) {
    return null;
  }
  var p = arrayParser$1.create(value, function(entry) {
    if (entry !== null) {
      entry = parseDate$1(entry);
    }
    return entry;
  });
  return p.parse();
};
var parseIntervalArray = function(value) {
  if (!value) {
    return null;
  }
  var p = arrayParser$1.create(value, function(entry) {
    if (entry !== null) {
      entry = parseInterval(entry);
    }
    return entry;
  });
  return p.parse();
};
var parseByteAArray = function(value) {
  if (!value) {
    return null;
  }
  return array$1.parse(value, allowNull(parseByteA));
};
var parseInteger = function(value) {
  return parseInt(value, 10);
};
var parseBigInteger = function(value) {
  var valStr = String(value);
  if (/^\d+$/.test(valStr)) {
    return valStr;
  }
  return value;
};
var parseJsonArray = function(value) {
  if (!value) {
    return null;
  }
  return array$1.parse(value, allowNull(JSON.parse));
};
var parsePoint = function(value) {
  if (value[0] !== "(") {
    return null;
  }
  value = value.substring(1, value.length - 1).split(",");
  return {
    x: parseFloat(value[0]),
    y: parseFloat(value[1])
  };
};
var parseCircle = function(value) {
  if (value[0] !== "<" && value[1] !== "(") {
    return null;
  }
  var point = "(";
  var radius = "";
  var pointParsed = false;
  for (var i = 2; i < value.length - 1; i++) {
    if (!pointParsed) {
      point += value[i];
    }
    if (value[i] === ")") {
      pointParsed = true;
      continue;
    } else if (!pointParsed) {
      continue;
    }
    if (value[i] === ",") {
      continue;
    }
    radius += value[i];
  }
  var result2 = parsePoint(point);
  result2.radius = parseFloat(radius);
  return result2;
};
var init$1 = function(register) {
  register(20, parseBigInteger);
  register(21, parseInteger);
  register(23, parseInteger);
  register(26, parseInteger);
  register(700, parseFloat);
  register(701, parseFloat);
  register(16, parseBool$1);
  register(1082, parseDate$1);
  register(1114, parseDate$1);
  register(1184, parseDate$1);
  register(600, parsePoint);
  register(651, parseStringArray);
  register(718, parseCircle);
  register(1e3, parseBoolArray);
  register(1001, parseByteAArray);
  register(1005, parseIntegerArray);
  register(1007, parseIntegerArray);
  register(1028, parseIntegerArray);
  register(1016, parseBigIntegerArray);
  register(1017, parsePointArray);
  register(1021, parseFloatArray);
  register(1022, parseFloatArray);
  register(1231, parseFloatArray);
  register(1014, parseStringArray);
  register(1015, parseStringArray);
  register(1008, parseStringArray);
  register(1009, parseStringArray);
  register(1040, parseStringArray);
  register(1041, parseStringArray);
  register(1115, parseDateArray);
  register(1182, parseDateArray);
  register(1185, parseDateArray);
  register(1186, parseInterval);
  register(1187, parseIntervalArray);
  register(17, parseByteA);
  register(114, JSON.parse.bind(JSON));
  register(3802, JSON.parse.bind(JSON));
  register(199, parseJsonArray);
  register(3807, parseJsonArray);
  register(3907, parseStringArray);
  register(2951, parseStringArray);
  register(791, parseStringArray);
  register(1183, parseStringArray);
  register(1270, parseStringArray);
};
var textParsers$1 = {
  init: init$1
};
var BASE = 1e6;
function readInt8(buffer) {
  var high = buffer.readInt32BE(0);
  var low = buffer.readUInt32BE(4);
  var sign = "";
  if (high < 0) {
    high = ~high + (low === 0);
    low = ~low + 1 >>> 0;
    sign = "-";
  }
  var result2 = "";
  var carry;
  var t;
  var digits;
  var pad;
  var l;
  var i;
  {
    carry = high % BASE;
    high = high / BASE >>> 0;
    t = 4294967296 * carry + low;
    low = t / BASE >>> 0;
    digits = "" + (t - BASE * low);
    if (low === 0 && high === 0) {
      return sign + digits + result2;
    }
    pad = "";
    l = 6 - digits.length;
    for (i = 0; i < l; i++) {
      pad += "0";
    }
    result2 = pad + digits + result2;
  }
  {
    carry = high % BASE;
    high = high / BASE >>> 0;
    t = 4294967296 * carry + low;
    low = t / BASE >>> 0;
    digits = "" + (t - BASE * low);
    if (low === 0 && high === 0) {
      return sign + digits + result2;
    }
    pad = "";
    l = 6 - digits.length;
    for (i = 0; i < l; i++) {
      pad += "0";
    }
    result2 = pad + digits + result2;
  }
  {
    carry = high % BASE;
    high = high / BASE >>> 0;
    t = 4294967296 * carry + low;
    low = t / BASE >>> 0;
    digits = "" + (t - BASE * low);
    if (low === 0 && high === 0) {
      return sign + digits + result2;
    }
    pad = "";
    l = 6 - digits.length;
    for (i = 0; i < l; i++) {
      pad += "0";
    }
    result2 = pad + digits + result2;
  }
  {
    carry = high % BASE;
    t = 4294967296 * carry + low;
    digits = "" + t % BASE;
    return sign + digits + result2;
  }
}
var pgInt8 = readInt8;
var parseInt64 = pgInt8;
var parseBits = function(data, bits, offset, invert, callback) {
  offset = offset || 0;
  invert = invert || false;
  callback = callback || function(lastValue, newValue, bits2) {
    return lastValue * Math.pow(2, bits2) + newValue;
  };
  var offsetBytes = offset >> 3;
  var inv = function(value) {
    if (invert) {
      return ~value & 255;
    }
    return value;
  };
  var mask = 255;
  var firstBits = 8 - offset % 8;
  if (bits < firstBits) {
    mask = 255 << 8 - bits & 255;
    firstBits = bits;
  }
  if (offset) {
    mask = mask >> offset % 8;
  }
  var result2 = 0;
  if (offset % 8 + bits >= 8) {
    result2 = callback(0, inv(data[offsetBytes]) & mask, firstBits);
  }
  var bytes = bits + offset >> 3;
  for (var i = offsetBytes + 1; i < bytes; i++) {
    result2 = callback(result2, inv(data[i]), 8);
  }
  var lastBits = (bits + offset) % 8;
  if (lastBits > 0) {
    result2 = callback(result2, inv(data[bytes]) >> 8 - lastBits, lastBits);
  }
  return result2;
};
var parseFloatFromBits = function(data, precisionBits, exponentBits) {
  var bias = Math.pow(2, exponentBits - 1) - 1;
  var sign = parseBits(data, 1);
  var exponent = parseBits(data, exponentBits, 1);
  if (exponent === 0) {
    return 0;
  }
  var precisionBitsCounter = 1;
  var parsePrecisionBits = function(lastValue, newValue, bits) {
    if (lastValue === 0) {
      lastValue = 1;
    }
    for (var i = 1; i <= bits; i++) {
      precisionBitsCounter /= 2;
      if ((newValue & 1 << bits - i) > 0) {
        lastValue += precisionBitsCounter;
      }
    }
    return lastValue;
  };
  var mantissa = parseBits(data, precisionBits, exponentBits + 1, false, parsePrecisionBits);
  if (exponent == Math.pow(2, exponentBits + 1) - 1) {
    if (mantissa === 0) {
      return sign === 0 ? Infinity : -Infinity;
    }
    return NaN;
  }
  return (sign === 0 ? 1 : -1) * Math.pow(2, exponent - bias) * mantissa;
};
var parseInt16 = function(value) {
  if (parseBits(value, 1) == 1) {
    return -1 * (parseBits(value, 15, 1, true) + 1);
  }
  return parseBits(value, 15, 1);
};
var parseInt32 = function(value) {
  if (parseBits(value, 1) == 1) {
    return -1 * (parseBits(value, 31, 1, true) + 1);
  }
  return parseBits(value, 31, 1);
};
var parseFloat32 = function(value) {
  return parseFloatFromBits(value, 23, 8);
};
var parseFloat64 = function(value) {
  return parseFloatFromBits(value, 52, 11);
};
var parseNumeric = function(value) {
  var sign = parseBits(value, 16, 32);
  if (sign == 49152) {
    return NaN;
  }
  var weight = Math.pow(1e4, parseBits(value, 16, 16));
  var result2 = 0;
  var ndigits = parseBits(value, 16);
  for (var i = 0; i < ndigits; i++) {
    result2 += parseBits(value, 16, 64 + 16 * i) * weight;
    weight /= 1e4;
  }
  var scale = Math.pow(10, parseBits(value, 16, 48));
  return (sign === 0 ? 1 : -1) * Math.round(result2 * scale) / scale;
};
var parseDate2 = function(isUTC, value) {
  var sign = parseBits(value, 1);
  var rawValue = parseBits(value, 63, 1);
  var result2 = new Date((sign === 0 ? 1 : -1) * rawValue / 1e3 + 9466848e5);
  if (!isUTC) {
    result2.setTime(result2.getTime() + result2.getTimezoneOffset() * 6e4);
  }
  result2.usec = rawValue % 1e3;
  result2.getMicroSeconds = function() {
    return this.usec;
  };
  result2.setMicroSeconds = function(value2) {
    this.usec = value2;
  };
  result2.getUTCMicroSeconds = function() {
    return this.usec;
  };
  return result2;
};
var parseArray = function(value) {
  var dim = parseBits(value, 32);
  parseBits(value, 32, 32);
  var elementType = parseBits(value, 32, 64);
  var offset = 96;
  var dims = [];
  for (var i = 0; i < dim; i++) {
    dims[i] = parseBits(value, 32, offset);
    offset += 32;
    offset += 32;
  }
  var parseElement = function(elementType2) {
    var length = parseBits(value, 32, offset);
    offset += 32;
    if (length == 4294967295) {
      return null;
    }
    var result2;
    if (elementType2 == 23 || elementType2 == 20) {
      result2 = parseBits(value, length * 8, offset);
      offset += length * 8;
      return result2;
    } else if (elementType2 == 25) {
      result2 = value.toString(this.encoding, offset >> 3, (offset += length << 3) >> 3);
      return result2;
    } else {
      console.log("ERROR: ElementType not implemented: " + elementType2);
    }
  };
  var parse2 = function(dimension, elementType2) {
    var array2 = [];
    var i2;
    if (dimension.length > 1) {
      var count = dimension.shift();
      for (i2 = 0; i2 < count; i2++) {
        array2[i2] = parse2(dimension, elementType2);
      }
      dimension.unshift(count);
    } else {
      for (i2 = 0; i2 < dimension[0]; i2++) {
        array2[i2] = parseElement(elementType2);
      }
    }
    return array2;
  };
  return parse2(dims, elementType);
};
var parseText = function(value) {
  return value.toString("utf8");
};
var parseBool = function(value) {
  if (value === null) return null;
  return parseBits(value, 8) > 0;
};
var init = function(register) {
  register(20, parseInt64);
  register(21, parseInt16);
  register(23, parseInt32);
  register(26, parseInt32);
  register(1700, parseNumeric);
  register(700, parseFloat32);
  register(701, parseFloat64);
  register(16, parseBool);
  register(1114, parseDate2.bind(null, false));
  register(1184, parseDate2.bind(null, true));
  register(1e3, parseArray);
  register(1007, parseArray);
  register(1016, parseArray);
  register(1008, parseArray);
  register(1009, parseArray);
  register(25, parseText);
};
var binaryParsers$1 = {
  init
};
var builtins = {
  BOOL: 16,
  BYTEA: 17,
  CHAR: 18,
  INT8: 20,
  INT2: 21,
  INT4: 23,
  REGPROC: 24,
  TEXT: 25,
  OID: 26,
  TID: 27,
  XID: 28,
  CID: 29,
  JSON: 114,
  XML: 142,
  PG_NODE_TREE: 194,
  SMGR: 210,
  PATH: 602,
  POLYGON: 604,
  CIDR: 650,
  FLOAT4: 700,
  FLOAT8: 701,
  ABSTIME: 702,
  RELTIME: 703,
  TINTERVAL: 704,
  CIRCLE: 718,
  MACADDR8: 774,
  MONEY: 790,
  MACADDR: 829,
  INET: 869,
  ACLITEM: 1033,
  BPCHAR: 1042,
  VARCHAR: 1043,
  DATE: 1082,
  TIME: 1083,
  TIMESTAMP: 1114,
  TIMESTAMPTZ: 1184,
  INTERVAL: 1186,
  TIMETZ: 1266,
  BIT: 1560,
  VARBIT: 1562,
  NUMERIC: 1700,
  REFCURSOR: 1790,
  REGPROCEDURE: 2202,
  REGOPER: 2203,
  REGOPERATOR: 2204,
  REGCLASS: 2205,
  REGTYPE: 2206,
  UUID: 2950,
  TXID_SNAPSHOT: 2970,
  PG_LSN: 3220,
  PG_NDISTINCT: 3361,
  PG_DEPENDENCIES: 3402,
  TSVECTOR: 3614,
  TSQUERY: 3615,
  GTSVECTOR: 3642,
  REGCONFIG: 3734,
  REGDICTIONARY: 3769,
  JSONB: 3802,
  REGNAMESPACE: 4089,
  REGROLE: 4096
};
var textParsers = textParsers$1;
var binaryParsers = binaryParsers$1;
var arrayParser = arrayParser$2;
var builtinTypes = builtins;
pgTypes.getTypeParser = getTypeParser;
pgTypes.setTypeParser = setTypeParser;
pgTypes.arrayParser = arrayParser;
pgTypes.builtins = builtinTypes;
var typeParsers = {
  text: {},
  binary: {}
};
function noParse(val2) {
  return String(val2);
}
function getTypeParser(oid, format) {
  format = format || "text";
  if (!typeParsers[format]) {
    return noParse;
  }
  return typeParsers[format][oid] || noParse;
}
function setTypeParser(oid, format, parseFn) {
  if (typeof format == "function") {
    parseFn = format;
    format = "text";
  }
  typeParsers[format][oid] = parseFn;
}
textParsers.init(function(oid, converter) {
  typeParsers.text[oid] = converter;
});
binaryParsers.init(function(oid, converter) {
  typeParsers.binary[oid] = converter;
});
(function(module) {
  let user;
  try {
    user = process.platform === "win32" ? process.env.USERNAME : process.env.USER;
  } catch {
  }
  module.exports = {
    // database host. defaults to localhost
    host: "localhost",
    // database user's name
    user,
    // name of database to connect
    database: void 0,
    // database user's password
    password: null,
    // a Postgres connection string to be used instead of setting individual connection items
    // NOTE:  Setting this value will cause it to override any other value (such as database or user) defined
    // in the defaults object.
    connectionString: void 0,
    // database port
    port: 5432,
    // number of rows to return at a time from a prepared statement's
    // portal. 0 will return all rows at once
    rows: 0,
    // binary result mode
    binary: false,
    // Connection pool options - see https://github.com/brianc/node-pg-pool
    // number of connections to use in connection pool
    // 0 will disable connection pooling
    max: 10,
    // max milliseconds a client can go unused before it is removed
    // from the pool and destroyed
    idleTimeoutMillis: 3e4,
    client_encoding: "",
    ssl: false,
    application_name: void 0,
    fallback_application_name: void 0,
    options: void 0,
    parseInputDatesAsUTC: false,
    // max milliseconds any query using this connection will execute for before timing out in error.
    // false=unlimited
    statement_timeout: false,
    // Abort any statement that waits longer than the specified duration in milliseconds while attempting to acquire a lock.
    // false=unlimited
    lock_timeout: false,
    // Terminate any session with an open transaction that has been idle for longer than the specified duration in milliseconds
    // false=unlimited
    idle_in_transaction_session_timeout: false,
    // max milliseconds to wait for query to complete (client side)
    query_timeout: false,
    connect_timeout: 0,
    keepalives: 1,
    keepalives_idle: 0
  };
  const pgTypes$1 = pgTypes;
  const parseBigInteger2 = pgTypes$1.getTypeParser(20, "text");
  const parseBigIntegerArray2 = pgTypes$1.getTypeParser(1016, "text");
  module.exports.__defineSetter__("parseInt8", function(val2) {
    pgTypes$1.setTypeParser(20, "text", val2 ? pgTypes$1.getTypeParser(23, "text") : parseBigInteger2);
    pgTypes$1.setTypeParser(1016, "text", val2 ? pgTypes$1.getTypeParser(1007, "text") : parseBigIntegerArray2);
  });
})(defaults$3);
var defaultsExports = defaults$3.exports;
const defaults$2 = defaultsExports;
const util$1 = require$$1$1;
const { isDate } = util$1.types || util$1;
function escapeElement(elementRepresentation) {
  const escaped = elementRepresentation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return '"' + escaped + '"';
}
function arrayString(val2) {
  let result2 = "{";
  for (let i = 0; i < val2.length; i++) {
    if (i > 0) {
      result2 = result2 + ",";
    }
    if (val2[i] === null || typeof val2[i] === "undefined") {
      result2 = result2 + "NULL";
    } else if (Array.isArray(val2[i])) {
      result2 = result2 + arrayString(val2[i]);
    } else if (ArrayBuffer.isView(val2[i])) {
      let item = val2[i];
      if (!(item instanceof Buffer)) {
        const buf = Buffer.from(item.buffer, item.byteOffset, item.byteLength);
        if (buf.length === item.byteLength) {
          item = buf;
        } else {
          item = buf.slice(item.byteOffset, item.byteOffset + item.byteLength);
        }
      }
      result2 += "\\\\x" + item.toString("hex");
    } else {
      result2 += escapeElement(prepareValue(val2[i]));
    }
  }
  result2 = result2 + "}";
  return result2;
}
const prepareValue = function(val2, seen) {
  if (val2 == null) {
    return null;
  }
  if (typeof val2 === "object") {
    if (val2 instanceof Buffer) {
      return val2;
    }
    if (ArrayBuffer.isView(val2)) {
      const buf = Buffer.from(val2.buffer, val2.byteOffset, val2.byteLength);
      if (buf.length === val2.byteLength) {
        return buf;
      }
      return buf.slice(val2.byteOffset, val2.byteOffset + val2.byteLength);
    }
    if (isDate(val2)) {
      if (defaults$2.parseInputDatesAsUTC) {
        return dateToStringUTC(val2);
      } else {
        return dateToString(val2);
      }
    }
    if (Array.isArray(val2)) {
      return arrayString(val2);
    }
    return prepareObject(val2, seen);
  }
  return val2.toString();
};
function prepareObject(val2, seen) {
  if (val2 && typeof val2.toPostgres === "function") {
    seen = seen || [];
    if (seen.indexOf(val2) !== -1) {
      throw new Error('circular reference detected while preparing "' + val2 + '" for query');
    }
    seen.push(val2);
    return prepareValue(val2.toPostgres(prepareValue), seen);
  }
  return JSON.stringify(val2);
}
function dateToString(date2) {
  let offset = -date2.getTimezoneOffset();
  let year = date2.getFullYear();
  const isBCYear = year < 1;
  if (isBCYear) year = Math.abs(year) + 1;
  let ret = String(year).padStart(4, "0") + "-" + String(date2.getMonth() + 1).padStart(2, "0") + "-" + String(date2.getDate()).padStart(2, "0") + "T" + String(date2.getHours()).padStart(2, "0") + ":" + String(date2.getMinutes()).padStart(2, "0") + ":" + String(date2.getSeconds()).padStart(2, "0") + "." + String(date2.getMilliseconds()).padStart(3, "0");
  if (offset < 0) {
    ret += "-";
    offset *= -1;
  } else {
    ret += "+";
  }
  ret += String(Math.floor(offset / 60)).padStart(2, "0") + ":" + String(offset % 60).padStart(2, "0");
  if (isBCYear) ret += " BC";
  return ret;
}
function dateToStringUTC(date2) {
  let year = date2.getUTCFullYear();
  const isBCYear = year < 1;
  if (isBCYear) year = Math.abs(year) + 1;
  let ret = String(year).padStart(4, "0") + "-" + String(date2.getUTCMonth() + 1).padStart(2, "0") + "-" + String(date2.getUTCDate()).padStart(2, "0") + "T" + String(date2.getUTCHours()).padStart(2, "0") + ":" + String(date2.getUTCMinutes()).padStart(2, "0") + ":" + String(date2.getUTCSeconds()).padStart(2, "0") + "." + String(date2.getUTCMilliseconds()).padStart(3, "0");
  ret += "+00:00";
  if (isBCYear) ret += " BC";
  return ret;
}
function normalizeQueryConfig(config2, values, callback) {
  config2 = typeof config2 === "string" ? { text: config2 } : config2;
  if (values) {
    if (typeof values === "function") {
      config2.callback = values;
    } else {
      config2.values = values;
    }
  }
  if (callback) {
    config2.callback = callback;
  }
  return config2;
}
const escapeIdentifier = function(str) {
  return '"' + str.replace(/"/g, '""') + '"';
};
const escapeLiteral = function(str) {
  let hasBackslash = false;
  let escaped = "'";
  if (str == null) {
    return "''";
  }
  if (typeof str !== "string") {
    return "''";
  }
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === "'") {
      escaped += c + c;
    } else if (c === "\\") {
      escaped += c + c;
      hasBackslash = true;
    } else {
      escaped += c;
    }
  }
  escaped += "'";
  if (hasBackslash === true) {
    escaped = " E" + escaped;
  }
  return escaped;
};
var utils$3 = {
  prepareValue: function prepareValueWrapper(value) {
    return prepareValue(value);
  },
  normalizeQueryConfig,
  escapeIdentifier,
  escapeLiteral
};
var utils$2 = { exports: {} };
var utilsLegacy;
var hasRequiredUtilsLegacy;
function requireUtilsLegacy() {
  if (hasRequiredUtilsLegacy) return utilsLegacy;
  hasRequiredUtilsLegacy = 1;
  const nodeCrypto = require$$0;
  function md5(string2) {
    return nodeCrypto.createHash("md5").update(string2, "utf-8").digest("hex");
  }
  function postgresMd5PasswordHash(user, password2, salt) {
    const inner = md5(password2 + user);
    const outer = md5(Buffer.concat([Buffer.from(inner), salt]));
    return "md5" + outer;
  }
  function sha256(text2) {
    return nodeCrypto.createHash("sha256").update(text2).digest();
  }
  function hashByName(hashName, text2) {
    hashName = hashName.replace(/(\D)-/, "$1");
    return nodeCrypto.createHash(hashName).update(text2).digest();
  }
  function hmacSha256(key, msg) {
    return nodeCrypto.createHmac("sha256", key).update(msg).digest();
  }
  async function deriveKey(password2, salt, iterations) {
    return nodeCrypto.pbkdf2Sync(password2, salt, iterations, 32, "sha256");
  }
  utilsLegacy = {
    postgresMd5PasswordHash,
    randomBytes: nodeCrypto.randomBytes,
    deriveKey,
    sha256,
    hashByName,
    hmacSha256,
    md5
  };
  return utilsLegacy;
}
var utilsWebcrypto;
var hasRequiredUtilsWebcrypto;
function requireUtilsWebcrypto() {
  if (hasRequiredUtilsWebcrypto) return utilsWebcrypto;
  hasRequiredUtilsWebcrypto = 1;
  const nodeCrypto = require$$0;
  utilsWebcrypto = {
    postgresMd5PasswordHash,
    randomBytes,
    deriveKey,
    sha256,
    hashByName,
    hmacSha256,
    md5
  };
  const webCrypto = nodeCrypto.webcrypto || globalThis.crypto;
  const subtleCrypto = webCrypto.subtle;
  const textEncoder = new TextEncoder();
  function randomBytes(length) {
    return webCrypto.getRandomValues(Buffer.alloc(length));
  }
  async function md5(string2) {
    try {
      return nodeCrypto.createHash("md5").update(string2, "utf-8").digest("hex");
    } catch (e) {
      const data = typeof string2 === "string" ? textEncoder.encode(string2) : string2;
      const hash = await subtleCrypto.digest("MD5", data);
      return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  }
  async function postgresMd5PasswordHash(user, password2, salt) {
    const inner = await md5(password2 + user);
    const outer = await md5(Buffer.concat([Buffer.from(inner), salt]));
    return "md5" + outer;
  }
  async function sha256(text2) {
    return await subtleCrypto.digest("SHA-256", text2);
  }
  async function hashByName(hashName, text2) {
    return await subtleCrypto.digest(hashName, text2);
  }
  async function hmacSha256(keyBuffer, msg) {
    const key = await subtleCrypto.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    return await subtleCrypto.sign("HMAC", key, textEncoder.encode(msg));
  }
  async function deriveKey(password2, salt, iterations) {
    const key = await subtleCrypto.importKey("raw", textEncoder.encode(password2), "PBKDF2", false, ["deriveBits"]);
    const params = { name: "PBKDF2", hash: "SHA-256", salt, iterations };
    return await subtleCrypto.deriveBits(params, key, 32 * 8, ["deriveBits"]);
  }
  return utilsWebcrypto;
}
const useLegacyCrypto = parseInt(process.versions && process.versions.node && process.versions.node.split(".")[0]) < 15;
if (useLegacyCrypto) {
  utils$2.exports = requireUtilsLegacy();
} else {
  utils$2.exports = requireUtilsWebcrypto();
}
var utilsExports = utils$2.exports;
function x509Error(msg, cert) {
  return new Error("SASL channel binding: " + msg + " when parsing public certificate " + cert.toString("base64"));
}
function readASN1Length(data, index2) {
  let length = data[index2++];
  if (length < 128) return { length, index: index2 };
  const lengthBytes = length & 127;
  if (lengthBytes > 4) throw x509Error("bad length", data);
  length = 0;
  for (let i = 0; i < lengthBytes; i++) {
    length = length << 8 | data[index2++];
  }
  return { length, index: index2 };
}
function readASN1OID(data, index2) {
  if (data[index2++] !== 6) throw x509Error("non-OID data", data);
  const { length: OIDLength, index: indexAfterOIDLength } = readASN1Length(data, index2);
  index2 = indexAfterOIDLength;
  const lastIndex = index2 + OIDLength;
  const byte1 = data[index2++];
  let oid = (byte1 / 40 >> 0) + "." + byte1 % 40;
  while (index2 < lastIndex) {
    let value = 0;
    while (index2 < lastIndex) {
      const nextByte = data[index2++];
      value = value << 7 | nextByte & 127;
      if (nextByte < 128) break;
    }
    oid += "." + value;
  }
  return { oid, index: index2 };
}
function expectASN1Seq(data, index2) {
  if (data[index2++] !== 48) throw x509Error("non-sequence data", data);
  return readASN1Length(data, index2);
}
function signatureAlgorithmHashFromCertificate$1(data, index2) {
  if (index2 === void 0) index2 = 0;
  index2 = expectASN1Seq(data, index2).index;
  const { length: certInfoLength, index: indexAfterCertInfoLength } = expectASN1Seq(data, index2);
  index2 = indexAfterCertInfoLength + certInfoLength;
  index2 = expectASN1Seq(data, index2).index;
  const { oid, index: indexAfterOID } = readASN1OID(data, index2);
  switch (oid) {
    // RSA
    case "1.2.840.113549.1.1.4":
      return "MD5";
    case "1.2.840.113549.1.1.5":
      return "SHA-1";
    case "1.2.840.113549.1.1.11":
      return "SHA-256";
    case "1.2.840.113549.1.1.12":
      return "SHA-384";
    case "1.2.840.113549.1.1.13":
      return "SHA-512";
    case "1.2.840.113549.1.1.14":
      return "SHA-224";
    case "1.2.840.113549.1.1.15":
      return "SHA512-224";
    case "1.2.840.113549.1.1.16":
      return "SHA512-256";
    // ECDSA
    case "1.2.840.10045.4.1":
      return "SHA-1";
    case "1.2.840.10045.4.3.1":
      return "SHA-224";
    case "1.2.840.10045.4.3.2":
      return "SHA-256";
    case "1.2.840.10045.4.3.3":
      return "SHA-384";
    case "1.2.840.10045.4.3.4":
      return "SHA-512";
    // RSASSA-PSS: hash is indicated separately
    case "1.2.840.113549.1.1.10": {
      index2 = indexAfterOID;
      index2 = expectASN1Seq(data, index2).index;
      if (data[index2++] !== 160) throw x509Error("non-tag data", data);
      index2 = readASN1Length(data, index2).index;
      index2 = expectASN1Seq(data, index2).index;
      const { oid: hashOID } = readASN1OID(data, index2);
      switch (hashOID) {
        // standalone hash OIDs
        case "1.2.840.113549.2.5":
          return "MD5";
        case "1.3.14.3.2.26":
          return "SHA-1";
        case "2.16.840.1.101.3.4.2.1":
          return "SHA-256";
        case "2.16.840.1.101.3.4.2.2":
          return "SHA-384";
        case "2.16.840.1.101.3.4.2.3":
          return "SHA-512";
      }
      throw x509Error("unknown hash OID " + hashOID, data);
    }
    // Ed25519 -- see https: return//github.com/openssl/openssl/issues/15477
    case "1.3.101.110":
    case "1.3.101.112":
      return "SHA-512";
    // Ed448 -- still not in pg 17.2 (if supported, digest would be SHAKE256 x 64 bytes)
    case "1.3.101.111":
    case "1.3.101.113":
      throw x509Error("Ed448 certificate channel binding is not currently supported by Postgres");
  }
  throw x509Error("unknown OID " + oid, data);
}
var certSignatures = { signatureAlgorithmHashFromCertificate: signatureAlgorithmHashFromCertificate$1 };
const crypto$1 = utilsExports;
const { signatureAlgorithmHashFromCertificate } = certSignatures;
function startSession(mechanisms, stream2) {
  const candidates = ["SCRAM-SHA-256"];
  if (stream2) candidates.unshift("SCRAM-SHA-256-PLUS");
  const mechanism = candidates.find((candidate) => mechanisms.includes(candidate));
  if (!mechanism) {
    throw new Error("SASL: Only mechanism(s) " + candidates.join(" and ") + " are supported");
  }
  if (mechanism === "SCRAM-SHA-256-PLUS" && typeof stream2.getPeerCertificate !== "function") {
    throw new Error("SASL: Mechanism SCRAM-SHA-256-PLUS requires a certificate");
  }
  const clientNonce = crypto$1.randomBytes(18).toString("base64");
  const gs2Header = mechanism === "SCRAM-SHA-256-PLUS" ? "p=tls-server-end-point" : stream2 ? "y" : "n";
  return {
    mechanism,
    clientNonce,
    response: gs2Header + ",,n=*,r=" + clientNonce,
    message: "SASLInitialResponse"
  };
}
async function continueSession(session, password2, serverData, stream2) {
  if (session.message !== "SASLInitialResponse") {
    throw new Error("SASL: Last message was not SASLInitialResponse");
  }
  if (typeof password2 !== "string") {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
  }
  if (password2 === "") {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string");
  }
  if (typeof serverData !== "string") {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
  }
  const sv2 = parseServerFirstMessage(serverData);
  if (!sv2.nonce.startsWith(session.clientNonce)) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
  } else if (sv2.nonce.length === session.clientNonce.length) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
  }
  const clientFirstMessageBare = "n=*,r=" + session.clientNonce;
  const serverFirstMessage = "r=" + sv2.nonce + ",s=" + sv2.salt + ",i=" + sv2.iteration;
  let channelBinding = stream2 ? "eSws" : "biws";
  if (session.mechanism === "SCRAM-SHA-256-PLUS") {
    const peerCert = stream2.getPeerCertificate().raw;
    let hashName = signatureAlgorithmHashFromCertificate(peerCert);
    if (hashName === "MD5" || hashName === "SHA-1") hashName = "SHA-256";
    const certHash = await crypto$1.hashByName(hashName, peerCert);
    const bindingData = Buffer.concat([Buffer.from("p=tls-server-end-point,,"), Buffer.from(certHash)]);
    channelBinding = bindingData.toString("base64");
  }
  const clientFinalMessageWithoutProof = "c=" + channelBinding + ",r=" + sv2.nonce;
  const authMessage = clientFirstMessageBare + "," + serverFirstMessage + "," + clientFinalMessageWithoutProof;
  const saltBytes = Buffer.from(sv2.salt, "base64");
  const saltedPassword = await crypto$1.deriveKey(password2, saltBytes, sv2.iteration);
  const clientKey = await crypto$1.hmacSha256(saltedPassword, "Client Key");
  const storedKey = await crypto$1.sha256(clientKey);
  const clientSignature = await crypto$1.hmacSha256(storedKey, authMessage);
  const clientProof = xorBuffers(Buffer.from(clientKey), Buffer.from(clientSignature)).toString("base64");
  const serverKey = await crypto$1.hmacSha256(saltedPassword, "Server Key");
  const serverSignatureBytes = await crypto$1.hmacSha256(serverKey, authMessage);
  session.message = "SASLResponse";
  session.serverSignature = Buffer.from(serverSignatureBytes).toString("base64");
  session.response = clientFinalMessageWithoutProof + ",p=" + clientProof;
}
function finalizeSession(session, serverData) {
  if (session.message !== "SASLResponse") {
    throw new Error("SASL: Last message was not SASLResponse");
  }
  if (typeof serverData !== "string") {
    throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
  }
  const { serverSignature } = parseServerFinalMessage(serverData);
  if (serverSignature !== session.serverSignature) {
    throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
  }
}
function isPrintableChars(text2) {
  if (typeof text2 !== "string") {
    throw new TypeError("SASL: text must be a string");
  }
  return text2.split("").map((_, i) => text2.charCodeAt(i)).every((c) => c >= 33 && c <= 43 || c >= 45 && c <= 126);
}
function isBase64(text2) {
  return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(text2);
}
function parseAttributePairs(text2) {
  if (typeof text2 !== "string") {
    throw new TypeError("SASL: attribute pairs text must be a string");
  }
  return new Map(
    text2.split(",").map((attrValue) => {
      if (!/^.=/.test(attrValue)) {
        throw new Error("SASL: Invalid attribute pair entry");
      }
      const name = attrValue[0];
      const value = attrValue.substring(2);
      return [name, value];
    })
  );
}
function parseServerFirstMessage(data) {
  const attrPairs = parseAttributePairs(data);
  const nonce = attrPairs.get("r");
  if (!nonce) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
  } else if (!isPrintableChars(nonce)) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
  }
  const salt = attrPairs.get("s");
  if (!salt) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
  } else if (!isBase64(salt)) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
  }
  const iterationText = attrPairs.get("i");
  if (!iterationText) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
  } else if (!/^[1-9][0-9]*$/.test(iterationText)) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
  }
  const iteration = parseInt(iterationText, 10);
  return {
    nonce,
    salt,
    iteration
  };
}
function parseServerFinalMessage(serverData) {
  const attrPairs = parseAttributePairs(serverData);
  const serverSignature = attrPairs.get("v");
  if (!serverSignature) {
    throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
  } else if (!isBase64(serverSignature)) {
    throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
  }
  return {
    serverSignature
  };
}
function xorBuffers(a, b) {
  if (!Buffer.isBuffer(a)) {
    throw new TypeError("first argument must be a Buffer");
  }
  if (!Buffer.isBuffer(b)) {
    throw new TypeError("second argument must be a Buffer");
  }
  if (a.length !== b.length) {
    throw new Error("Buffer lengths must match");
  }
  if (a.length === 0) {
    throw new Error("Buffers cannot be empty");
  }
  return Buffer.from(a.map((_, i) => a[i] ^ b[i]));
}
var sasl$1 = {
  startSession,
  continueSession,
  finalizeSession
};
const types$1 = pgTypes;
function TypeOverrides$1(userTypes) {
  this._types = userTypes || types$1;
  this.text = {};
  this.binary = {};
}
TypeOverrides$1.prototype.getOverrides = function(format) {
  switch (format) {
    case "text":
      return this.text;
    case "binary":
      return this.binary;
    default:
      return {};
  }
};
TypeOverrides$1.prototype.setTypeParser = function(oid, format, parseFn) {
  if (typeof format === "function") {
    parseFn = format;
    format = "text";
  }
  this.getOverrides(format)[oid] = parseFn;
};
TypeOverrides$1.prototype.getTypeParser = function(oid, format) {
  format = format || "text";
  return this.getOverrides(format)[oid] || this._types.getTypeParser(oid, format);
};
var typeOverrides = TypeOverrides$1;
function parse$5(str, options = {}) {
  if (str.charAt(0) === "/") {
    const config3 = str.split(" ");
    return { host: config3[0], database: config3[1] };
  }
  const config2 = {};
  let result2;
  let dummyHost = false;
  if (/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str)) {
    str = encodeURI(str).replace(/%25(\d\d)/g, "%$1");
  }
  try {
    try {
      result2 = new URL(str, "postgres://base");
    } catch (e) {
      result2 = new URL(str.replace("@/", "@___DUMMY___/"), "postgres://base");
      dummyHost = true;
    }
  } catch (err) {
    err.input && (err.input = "*****REDACTED*****");
    throw err;
  }
  for (const entry of result2.searchParams.entries()) {
    config2[entry[0]] = entry[1];
  }
  config2.user = config2.user || decodeURIComponent(result2.username);
  config2.password = config2.password || decodeURIComponent(result2.password);
  if (result2.protocol == "socket:") {
    config2.host = decodeURI(result2.pathname);
    config2.database = result2.searchParams.get("db");
    config2.client_encoding = result2.searchParams.get("encoding");
    return config2;
  }
  const hostname2 = dummyHost ? "" : result2.hostname;
  if (!config2.host) {
    config2.host = decodeURIComponent(hostname2);
  } else if (hostname2 && /^%2f/i.test(hostname2)) {
    result2.pathname = hostname2 + result2.pathname;
  }
  if (!config2.port) {
    config2.port = result2.port;
  }
  const pathname = result2.pathname.slice(1) || null;
  config2.database = pathname ? decodeURI(pathname) : null;
  if (config2.ssl === "true" || config2.ssl === "1") {
    config2.ssl = true;
  }
  if (config2.ssl === "0") {
    config2.ssl = false;
  }
  if (config2.sslcert || config2.sslkey || config2.sslrootcert || config2.sslmode) {
    config2.ssl = {};
  }
  const fs = config2.sslcert || config2.sslkey || config2.sslrootcert ? require$$0$1 : null;
  if (config2.sslcert) {
    config2.ssl.cert = fs.readFileSync(config2.sslcert).toString();
  }
  if (config2.sslkey) {
    config2.ssl.key = fs.readFileSync(config2.sslkey).toString();
  }
  if (config2.sslrootcert) {
    config2.ssl.ca = fs.readFileSync(config2.sslrootcert).toString();
  }
  if (options.useLibpqCompat && config2.uselibpqcompat) {
    throw new Error("Both useLibpqCompat and uselibpqcompat are set. Please use only one of them.");
  }
  if (config2.uselibpqcompat === "true" || options.useLibpqCompat) {
    switch (config2.sslmode) {
      case "disable": {
        config2.ssl = false;
        break;
      }
      case "prefer": {
        config2.ssl.rejectUnauthorized = false;
        break;
      }
      case "require": {
        if (config2.sslrootcert) {
          config2.ssl.checkServerIdentity = function() {
          };
        } else {
          config2.ssl.rejectUnauthorized = false;
        }
        break;
      }
      case "verify-ca": {
        if (!config2.ssl.ca) {
          throw new Error(
            "SECURITY WARNING: Using sslmode=verify-ca requires specifying a CA with sslrootcert. If a public CA is used, verify-ca allows connections to a server that somebody else may have registered with the CA, making you vulnerable to Man-in-the-Middle attacks. Either specify a custom CA certificate with sslrootcert parameter or use sslmode=verify-full for proper security."
          );
        }
        config2.ssl.checkServerIdentity = function() {
        };
        break;
      }
    }
  } else {
    switch (config2.sslmode) {
      case "disable": {
        config2.ssl = false;
        break;
      }
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full": {
        if (config2.sslmode !== "verify-full") {
          deprecatedSslModeWarning(config2.sslmode);
        }
        break;
      }
      case "no-verify": {
        config2.ssl.rejectUnauthorized = false;
        break;
      }
    }
  }
  return config2;
}
function toConnectionOptions(sslConfig) {
  const connectionOptions = Object.entries(sslConfig).reduce((c, [key, value]) => {
    if (value !== void 0 && value !== null) {
      c[key] = value;
    }
    return c;
  }, {});
  return connectionOptions;
}
function toClientConfig(config2) {
  const poolConfig = Object.entries(config2).reduce((c, [key, value]) => {
    if (key === "ssl") {
      const sslConfig = value;
      if (typeof sslConfig === "boolean") {
        c[key] = sslConfig;
      }
      if (typeof sslConfig === "object") {
        c[key] = toConnectionOptions(sslConfig);
      }
    } else if (value !== void 0 && value !== null) {
      if (key === "port") {
        if (value !== "") {
          const v = parseInt(value, 10);
          if (isNaN(v)) {
            throw new Error(`Invalid ${key}: ${value}`);
          }
          c[key] = v;
        }
      } else {
        c[key] = value;
      }
    }
    return c;
  }, {});
  return poolConfig;
}
function parseIntoClientConfig(str) {
  return toClientConfig(parse$5(str));
}
function deprecatedSslModeWarning(sslmode) {
  if (!deprecatedSslModeWarning.warned && typeof process !== "undefined" && process.emitWarning) {
    deprecatedSslModeWarning.warned = true;
    process.emitWarning(`SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'.
In the next major version (pg-connection-string v3.0.0 and pg v9.0.0), these modes will adopt standard libpq semantics, which have weaker security guarantees.

To prepare for this change:
- If you want the current behavior, explicitly use 'sslmode=verify-full'
- If you want libpq compatibility now, use 'uselibpqcompat=true&sslmode=${sslmode}'

See https://www.postgresql.org/docs/current/libpq-ssl.html for libpq SSL mode definitions.`);
  }
}
var pgConnectionString = parse$5;
parse$5.parse = parse$5;
parse$5.toClientConfig = toClientConfig;
parse$5.parseIntoClientConfig = parseIntoClientConfig;
const dns = require$$0$2;
const defaults$1 = defaultsExports;
const parse$4 = pgConnectionString.parse;
const val = function(key, config2, envVar) {
  if (config2[key]) {
    return config2[key];
  }
  if (envVar === void 0) {
    envVar = process.env["PG" + key.toUpperCase()];
  } else if (envVar === false) ;
  else {
    envVar = process.env[envVar];
  }
  return envVar || defaults$1[key];
};
const readSSLConfigFromEnvironment = function() {
  switch (process.env.PGSSLMODE) {
    case "disable":
      return false;
    case "prefer":
    case "require":
    case "verify-ca":
    case "verify-full":
      return true;
    case "no-verify":
      return { rejectUnauthorized: false };
  }
  return defaults$1.ssl;
};
const quoteParamValue = function(value) {
  return "'" + ("" + value).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
};
const add = function(params, config2, paramName) {
  const value = config2[paramName];
  if (value !== void 0 && value !== null) {
    params.push(paramName + "=" + quoteParamValue(value));
  }
};
let ConnectionParameters$1 = class ConnectionParameters {
  constructor(config2) {
    config2 = typeof config2 === "string" ? parse$4(config2) : config2 || {};
    if (config2.connectionString) {
      config2 = Object.assign({}, config2, parse$4(config2.connectionString));
    }
    this.user = val("user", config2);
    this.database = val("database", config2);
    if (this.database === void 0) {
      this.database = this.user;
    }
    this.port = parseInt(val("port", config2), 10);
    this.host = val("host", config2);
    Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: val("password", config2)
    });
    this.binary = val("binary", config2);
    this.options = val("options", config2);
    this.ssl = typeof config2.ssl === "undefined" ? readSSLConfigFromEnvironment() : config2.ssl;
    if (typeof this.ssl === "string") {
      if (this.ssl === "true") {
        this.ssl = true;
      }
    }
    if (this.ssl === "no-verify") {
      this.ssl = { rejectUnauthorized: false };
    }
    if (this.ssl && this.ssl.key) {
      Object.defineProperty(this.ssl, "key", {
        enumerable: false
      });
    }
    this.client_encoding = val("client_encoding", config2);
    this.replication = val("replication", config2);
    this.isDomainSocket = !(this.host || "").indexOf("/");
    this.application_name = val("application_name", config2, "PGAPPNAME");
    this.fallback_application_name = val("fallback_application_name", config2, false);
    this.statement_timeout = val("statement_timeout", config2, false);
    this.lock_timeout = val("lock_timeout", config2, false);
    this.idle_in_transaction_session_timeout = val("idle_in_transaction_session_timeout", config2, false);
    this.query_timeout = val("query_timeout", config2, false);
    if (config2.connectionTimeoutMillis === void 0) {
      this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0;
    } else {
      this.connect_timeout = Math.floor(config2.connectionTimeoutMillis / 1e3);
    }
    if (config2.keepAlive === false) {
      this.keepalives = 0;
    } else if (config2.keepAlive === true) {
      this.keepalives = 1;
    }
    if (typeof config2.keepAliveInitialDelayMillis === "number") {
      this.keepalives_idle = Math.floor(config2.keepAliveInitialDelayMillis / 1e3);
    }
  }
  getLibpqConnectionString(cb) {
    const params = [];
    add(params, this, "user");
    add(params, this, "password");
    add(params, this, "port");
    add(params, this, "application_name");
    add(params, this, "fallback_application_name");
    add(params, this, "connect_timeout");
    add(params, this, "options");
    const ssl = typeof this.ssl === "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
    add(params, ssl, "sslmode");
    add(params, ssl, "sslca");
    add(params, ssl, "sslkey");
    add(params, ssl, "sslcert");
    add(params, ssl, "sslrootcert");
    if (this.database) {
      params.push("dbname=" + quoteParamValue(this.database));
    }
    if (this.replication) {
      params.push("replication=" + quoteParamValue(this.replication));
    }
    if (this.host) {
      params.push("host=" + quoteParamValue(this.host));
    }
    if (this.isDomainSocket) {
      return cb(null, params.join(" "));
    }
    if (this.client_encoding) {
      params.push("client_encoding=" + quoteParamValue(this.client_encoding));
    }
    dns.lookup(this.host, function(err, address) {
      if (err) return cb(err, null);
      params.push("hostaddr=" + quoteParamValue(address));
      return cb(null, params.join(" "));
    });
  }
};
var connectionParameters = ConnectionParameters$1;
const types = pgTypes;
const matchRegexp = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
let Result$1 = class Result {
  constructor(rowMode, types2) {
    this.command = null;
    this.rowCount = null;
    this.oid = null;
    this.rows = [];
    this.fields = [];
    this._parsers = void 0;
    this._types = types2;
    this.RowCtor = null;
    this.rowAsArray = rowMode === "array";
    if (this.rowAsArray) {
      this.parseRow = this._parseRowAsArray;
    }
    this._prebuiltEmptyResultObject = null;
  }
  // adds a command complete message
  addCommandComplete(msg) {
    let match;
    if (msg.text) {
      match = matchRegexp.exec(msg.text);
    } else {
      match = matchRegexp.exec(msg.command);
    }
    if (match) {
      this.command = match[1];
      if (match[3]) {
        this.oid = parseInt(match[2], 10);
        this.rowCount = parseInt(match[3], 10);
      } else if (match[2]) {
        this.rowCount = parseInt(match[2], 10);
      }
    }
  }
  _parseRowAsArray(rowData) {
    const row = new Array(rowData.length);
    for (let i = 0, len = rowData.length; i < len; i++) {
      const rawValue = rowData[i];
      if (rawValue !== null) {
        row[i] = this._parsers[i](rawValue);
      } else {
        row[i] = null;
      }
    }
    return row;
  }
  parseRow(rowData) {
    const row = { ...this._prebuiltEmptyResultObject };
    for (let i = 0, len = rowData.length; i < len; i++) {
      const rawValue = rowData[i];
      const field = this.fields[i].name;
      if (rawValue !== null) {
        const v = this.fields[i].format === "binary" ? Buffer.from(rawValue) : rawValue;
        row[field] = this._parsers[i](v);
      } else {
        row[field] = null;
      }
    }
    return row;
  }
  addRow(row) {
    this.rows.push(row);
  }
  addFields(fieldDescriptions) {
    this.fields = fieldDescriptions;
    if (this.fields.length) {
      this._parsers = new Array(fieldDescriptions.length);
    }
    const row = {};
    for (let i = 0; i < fieldDescriptions.length; i++) {
      const desc2 = fieldDescriptions[i];
      row[desc2.name] = null;
      if (this._types) {
        this._parsers[i] = this._types.getTypeParser(desc2.dataTypeID, desc2.format || "text");
      } else {
        this._parsers[i] = types.getTypeParser(desc2.dataTypeID, desc2.format || "text");
      }
    }
    this._prebuiltEmptyResultObject = { ...row };
  }
};
var result = Result$1;
const { EventEmitter: EventEmitter$2 } = require$$0$3;
const Result2 = result;
const utils$1 = utils$3;
let Query$1 = class Query extends EventEmitter$2 {
  constructor(config2, values, callback) {
    super();
    config2 = utils$1.normalizeQueryConfig(config2, values, callback);
    this.text = config2.text;
    this.values = config2.values;
    this.rows = config2.rows;
    this.types = config2.types;
    this.name = config2.name;
    this.queryMode = config2.queryMode;
    this.binary = config2.binary;
    this.portal = config2.portal || "";
    this.callback = config2.callback;
    this._rowMode = config2.rowMode;
    if (process.domain && config2.callback) {
      this.callback = process.domain.bind(config2.callback);
    }
    this._result = new Result2(this._rowMode, this.types);
    this._results = this._result;
    this._canceledDueToError = false;
  }
  requiresPreparation() {
    if (this.queryMode === "extended") {
      return true;
    }
    if (this.name) {
      return true;
    }
    if (this.rows) {
      return true;
    }
    if (!this.text) {
      return false;
    }
    if (!this.values) {
      return false;
    }
    return this.values.length > 0;
  }
  _checkForMultirow() {
    if (this._result.command) {
      if (!Array.isArray(this._results)) {
        this._results = [this._result];
      }
      this._result = new Result2(this._rowMode, this._result._types);
      this._results.push(this._result);
    }
  }
  // associates row metadata from the supplied
  // message with this query object
  // metadata used when parsing row results
  handleRowDescription(msg) {
    this._checkForMultirow();
    this._result.addFields(msg.fields);
    this._accumulateRows = this.callback || !this.listeners("row").length;
  }
  handleDataRow(msg) {
    let row;
    if (this._canceledDueToError) {
      return;
    }
    try {
      row = this._result.parseRow(msg.fields);
    } catch (err) {
      this._canceledDueToError = err;
      return;
    }
    this.emit("row", row, this._result);
    if (this._accumulateRows) {
      this._result.addRow(row);
    }
  }
  handleCommandComplete(msg, connection2) {
    this._checkForMultirow();
    this._result.addCommandComplete(msg);
    if (this.rows) {
      connection2.sync();
    }
  }
  // if a named prepared statement is created with empty query text
  // the backend will send an emptyQuery message but *not* a command complete message
  // since we pipeline sync immediately after execute we don't need to do anything here
  // unless we have rows specified, in which case we did not pipeline the initial sync call
  handleEmptyQuery(connection2) {
    if (this.rows) {
      connection2.sync();
    }
  }
  handleError(err, connection2) {
    if (this._canceledDueToError) {
      err = this._canceledDueToError;
      this._canceledDueToError = false;
    }
    if (this.callback) {
      return this.callback(err);
    }
    this.emit("error", err);
  }
  handleReadyForQuery(con) {
    if (this._canceledDueToError) {
      return this.handleError(this._canceledDueToError, con);
    }
    if (this.callback) {
      try {
        this.callback(null, this._results);
      } catch (err) {
        process.nextTick(() => {
          throw err;
        });
      }
    }
    this.emit("end", this._results);
  }
  submit(connection2) {
    if (typeof this.text !== "string" && typeof this.name !== "string") {
      return new Error("A query must have either text or a name. Supplying neither is unsupported.");
    }
    const previous = connection2.parsedStatements[this.name];
    if (this.text && previous && this.text !== previous) {
      return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
    }
    if (this.values && !Array.isArray(this.values)) {
      return new Error("Query values must be an array");
    }
    if (this.requiresPreparation()) {
      connection2.stream.cork && connection2.stream.cork();
      try {
        this.prepare(connection2);
      } finally {
        connection2.stream.uncork && connection2.stream.uncork();
      }
    } else {
      connection2.query(this.text);
    }
    return null;
  }
  hasBeenParsed(connection2) {
    return this.name && connection2.parsedStatements[this.name];
  }
  handlePortalSuspended(connection2) {
    this._getRows(connection2, this.rows);
  }
  _getRows(connection2, rows) {
    connection2.execute({
      portal: this.portal,
      rows
    });
    if (!rows) {
      connection2.sync();
    } else {
      connection2.flush();
    }
  }
  // http://developer.postgresql.org/pgdocs/postgres/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
  prepare(connection2) {
    if (!this.hasBeenParsed(connection2)) {
      connection2.parse({
        text: this.text,
        name: this.name,
        types: this.types
      });
    }
    try {
      connection2.bind({
        portal: this.portal,
        statement: this.name,
        values: this.values,
        binary: this.binary,
        valueMapper: utils$1.prepareValue
      });
    } catch (err) {
      this.handleError(err, connection2);
      return;
    }
    connection2.describe({
      type: "P",
      name: this.portal || ""
    });
    this._getRows(connection2, this.rows);
  }
  handleCopyInResponse(connection2) {
    connection2.sendCopyFail("No source stream defined");
  }
  handleCopyData(msg, connection2) {
  }
};
var query$2 = Query$1;
var dist = {};
var messages = {};
Object.defineProperty(messages, "__esModule", { value: true });
messages.NoticeMessage = messages.DataRowMessage = messages.CommandCompleteMessage = messages.ReadyForQueryMessage = messages.NotificationResponseMessage = messages.BackendKeyDataMessage = messages.AuthenticationMD5Password = messages.ParameterStatusMessage = messages.ParameterDescriptionMessage = messages.RowDescriptionMessage = messages.Field = messages.CopyResponse = messages.CopyDataMessage = messages.DatabaseError = messages.copyDone = messages.emptyQuery = messages.replicationStart = messages.portalSuspended = messages.noData = messages.closeComplete = messages.bindComplete = messages.parseComplete = void 0;
messages.parseComplete = {
  name: "parseComplete",
  length: 5
};
messages.bindComplete = {
  name: "bindComplete",
  length: 5
};
messages.closeComplete = {
  name: "closeComplete",
  length: 5
};
messages.noData = {
  name: "noData",
  length: 5
};
messages.portalSuspended = {
  name: "portalSuspended",
  length: 5
};
messages.replicationStart = {
  name: "replicationStart",
  length: 4
};
messages.emptyQuery = {
  name: "emptyQuery",
  length: 4
};
messages.copyDone = {
  name: "copyDone",
  length: 4
};
class DatabaseError extends Error {
  constructor(message, length, name) {
    super(message);
    this.length = length;
    this.name = name;
  }
}
messages.DatabaseError = DatabaseError;
class CopyDataMessage {
  constructor(length, chunk) {
    this.length = length;
    this.chunk = chunk;
    this.name = "copyData";
  }
}
messages.CopyDataMessage = CopyDataMessage;
class CopyResponse {
  constructor(length, name, binary, columnCount) {
    this.length = length;
    this.name = name;
    this.binary = binary;
    this.columnTypes = new Array(columnCount);
  }
}
messages.CopyResponse = CopyResponse;
class Field {
  constructor(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, format) {
    this.name = name;
    this.tableID = tableID;
    this.columnID = columnID;
    this.dataTypeID = dataTypeID;
    this.dataTypeSize = dataTypeSize;
    this.dataTypeModifier = dataTypeModifier;
    this.format = format;
  }
}
messages.Field = Field;
class RowDescriptionMessage {
  constructor(length, fieldCount) {
    this.length = length;
    this.fieldCount = fieldCount;
    this.name = "rowDescription";
    this.fields = new Array(this.fieldCount);
  }
}
messages.RowDescriptionMessage = RowDescriptionMessage;
class ParameterDescriptionMessage {
  constructor(length, parameterCount) {
    this.length = length;
    this.parameterCount = parameterCount;
    this.name = "parameterDescription";
    this.dataTypeIDs = new Array(this.parameterCount);
  }
}
messages.ParameterDescriptionMessage = ParameterDescriptionMessage;
class ParameterStatusMessage {
  constructor(length, parameterName, parameterValue) {
    this.length = length;
    this.parameterName = parameterName;
    this.parameterValue = parameterValue;
    this.name = "parameterStatus";
  }
}
messages.ParameterStatusMessage = ParameterStatusMessage;
class AuthenticationMD5Password {
  constructor(length, salt) {
    this.length = length;
    this.salt = salt;
    this.name = "authenticationMD5Password";
  }
}
messages.AuthenticationMD5Password = AuthenticationMD5Password;
class BackendKeyDataMessage {
  constructor(length, processID, secretKey) {
    this.length = length;
    this.processID = processID;
    this.secretKey = secretKey;
    this.name = "backendKeyData";
  }
}
messages.BackendKeyDataMessage = BackendKeyDataMessage;
class NotificationResponseMessage {
  constructor(length, processId, channel, payload) {
    this.length = length;
    this.processId = processId;
    this.channel = channel;
    this.payload = payload;
    this.name = "notification";
  }
}
messages.NotificationResponseMessage = NotificationResponseMessage;
class ReadyForQueryMessage {
  constructor(length, status) {
    this.length = length;
    this.status = status;
    this.name = "readyForQuery";
  }
}
messages.ReadyForQueryMessage = ReadyForQueryMessage;
class CommandCompleteMessage {
  constructor(length, text2) {
    this.length = length;
    this.text = text2;
    this.name = "commandComplete";
  }
}
messages.CommandCompleteMessage = CommandCompleteMessage;
class DataRowMessage {
  constructor(length, fields) {
    this.length = length;
    this.fields = fields;
    this.name = "dataRow";
    this.fieldCount = fields.length;
  }
}
messages.DataRowMessage = DataRowMessage;
class NoticeMessage {
  constructor(length, message) {
    this.length = length;
    this.message = message;
    this.name = "notice";
  }
}
messages.NoticeMessage = NoticeMessage;
var serializer = {};
var bufferWriter = {};
Object.defineProperty(bufferWriter, "__esModule", { value: true });
bufferWriter.Writer = void 0;
class Writer {
  constructor(size = 256) {
    this.size = size;
    this.offset = 5;
    this.headerPosition = 0;
    this.buffer = Buffer.allocUnsafe(size);
  }
  ensure(size) {
    const remaining = this.buffer.length - this.offset;
    if (remaining < size) {
      const oldBuffer = this.buffer;
      const newSize = oldBuffer.length + (oldBuffer.length >> 1) + size;
      this.buffer = Buffer.allocUnsafe(newSize);
      oldBuffer.copy(this.buffer);
    }
  }
  addInt32(num) {
    this.ensure(4);
    this.buffer[this.offset++] = num >>> 24 & 255;
    this.buffer[this.offset++] = num >>> 16 & 255;
    this.buffer[this.offset++] = num >>> 8 & 255;
    this.buffer[this.offset++] = num >>> 0 & 255;
    return this;
  }
  addInt16(num) {
    this.ensure(2);
    this.buffer[this.offset++] = num >>> 8 & 255;
    this.buffer[this.offset++] = num >>> 0 & 255;
    return this;
  }
  addCString(string2) {
    if (!string2) {
      this.ensure(1);
    } else {
      const len = Buffer.byteLength(string2);
      this.ensure(len + 1);
      this.buffer.write(string2, this.offset, "utf-8");
      this.offset += len;
    }
    this.buffer[this.offset++] = 0;
    return this;
  }
  addString(string2 = "") {
    const len = Buffer.byteLength(string2);
    this.ensure(len);
    this.buffer.write(string2, this.offset);
    this.offset += len;
    return this;
  }
  add(otherBuffer) {
    this.ensure(otherBuffer.length);
    otherBuffer.copy(this.buffer, this.offset);
    this.offset += otherBuffer.length;
    return this;
  }
  join(code) {
    if (code) {
      this.buffer[this.headerPosition] = code;
      const length = this.offset - (this.headerPosition + 1);
      this.buffer.writeInt32BE(length, this.headerPosition + 1);
    }
    return this.buffer.slice(code ? 0 : 5, this.offset);
  }
  flush(code) {
    const result2 = this.join(code);
    this.offset = 5;
    this.headerPosition = 0;
    this.buffer = Buffer.allocUnsafe(this.size);
    return result2;
  }
}
bufferWriter.Writer = Writer;
Object.defineProperty(serializer, "__esModule", { value: true });
serializer.serialize = void 0;
const buffer_writer_1 = bufferWriter;
const writer = new buffer_writer_1.Writer();
const startup = (opts) => {
  writer.addInt16(3).addInt16(0);
  for (const key of Object.keys(opts)) {
    writer.addCString(key).addCString(opts[key]);
  }
  writer.addCString("client_encoding").addCString("UTF8");
  const bodyBuffer = writer.addCString("").flush();
  const length = bodyBuffer.length + 4;
  return new buffer_writer_1.Writer().addInt32(length).add(bodyBuffer).flush();
};
const requestSsl = () => {
  const response = Buffer.allocUnsafe(8);
  response.writeInt32BE(8, 0);
  response.writeInt32BE(80877103, 4);
  return response;
};
const password = (password2) => {
  return writer.addCString(password2).flush(
    112
    /* code.startup */
  );
};
const sendSASLInitialResponseMessage = function(mechanism, initialResponse) {
  writer.addCString(mechanism).addInt32(Buffer.byteLength(initialResponse)).addString(initialResponse);
  return writer.flush(
    112
    /* code.startup */
  );
};
const sendSCRAMClientFinalMessage = function(additionalData) {
  return writer.addString(additionalData).flush(
    112
    /* code.startup */
  );
};
const query$1 = (text2) => {
  return writer.addCString(text2).flush(
    81
    /* code.query */
  );
};
const emptyArray = [];
const parse$3 = (query2) => {
  const name = query2.name || "";
  if (name.length > 63) {
    console.error("Warning! Postgres only supports 63 characters for query names.");
    console.error("You supplied %s (%s)", name, name.length);
    console.error("This can cause conflicts and silent errors executing queries");
  }
  const types2 = query2.types || emptyArray;
  const len = types2.length;
  const buffer = writer.addCString(name).addCString(query2.text).addInt16(len);
  for (let i = 0; i < len; i++) {
    buffer.addInt32(types2[i]);
  }
  return writer.flush(
    80
    /* code.parse */
  );
};
const paramWriter = new buffer_writer_1.Writer();
const writeValues = function(values, valueMapper) {
  for (let i = 0; i < values.length; i++) {
    const mappedVal = valueMapper ? valueMapper(values[i], i) : values[i];
    if (mappedVal == null) {
      writer.addInt16(
        0
        /* ParamType.STRING */
      );
      paramWriter.addInt32(-1);
    } else if (mappedVal instanceof Buffer) {
      writer.addInt16(
        1
        /* ParamType.BINARY */
      );
      paramWriter.addInt32(mappedVal.length);
      paramWriter.add(mappedVal);
    } else {
      writer.addInt16(
        0
        /* ParamType.STRING */
      );
      paramWriter.addInt32(Buffer.byteLength(mappedVal));
      paramWriter.addString(mappedVal);
    }
  }
};
const bind = (config2 = {}) => {
  const portal = config2.portal || "";
  const statement = config2.statement || "";
  const binary = config2.binary || false;
  const values = config2.values || emptyArray;
  const len = values.length;
  writer.addCString(portal).addCString(statement);
  writer.addInt16(len);
  writeValues(values, config2.valueMapper);
  writer.addInt16(len);
  writer.add(paramWriter.flush());
  writer.addInt16(1);
  writer.addInt16(
    binary ? 1 : 0
    /* ParamType.STRING */
  );
  return writer.flush(
    66
    /* code.bind */
  );
};
const emptyExecute = Buffer.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]);
const execute = (config2) => {
  if (!config2 || !config2.portal && !config2.rows) {
    return emptyExecute;
  }
  const portal = config2.portal || "";
  const rows = config2.rows || 0;
  const portalLength = Buffer.byteLength(portal);
  const len = 4 + portalLength + 1 + 4;
  const buff = Buffer.allocUnsafe(1 + len);
  buff[0] = 69;
  buff.writeInt32BE(len, 1);
  buff.write(portal, 5, "utf-8");
  buff[portalLength + 5] = 0;
  buff.writeUInt32BE(rows, buff.length - 4);
  return buff;
};
const cancel = (processID, secretKey) => {
  const buffer = Buffer.allocUnsafe(16);
  buffer.writeInt32BE(16, 0);
  buffer.writeInt16BE(1234, 4);
  buffer.writeInt16BE(5678, 6);
  buffer.writeInt32BE(processID, 8);
  buffer.writeInt32BE(secretKey, 12);
  return buffer;
};
const cstringMessage = (code, string2) => {
  const stringLen = Buffer.byteLength(string2);
  const len = 4 + stringLen + 1;
  const buffer = Buffer.allocUnsafe(1 + len);
  buffer[0] = code;
  buffer.writeInt32BE(len, 1);
  buffer.write(string2, 5, "utf-8");
  buffer[len] = 0;
  return buffer;
};
const emptyDescribePortal = writer.addCString("P").flush(
  68
  /* code.describe */
);
const emptyDescribeStatement = writer.addCString("S").flush(
  68
  /* code.describe */
);
const describe = (msg) => {
  return msg.name ? cstringMessage(68, `${msg.type}${msg.name || ""}`) : msg.type === "P" ? emptyDescribePortal : emptyDescribeStatement;
};
const close = (msg) => {
  const text2 = `${msg.type}${msg.name || ""}`;
  return cstringMessage(67, text2);
};
const copyData = (chunk) => {
  return writer.add(chunk).flush(
    100
    /* code.copyFromChunk */
  );
};
const copyFail = (message) => {
  return cstringMessage(102, message);
};
const codeOnlyBuffer = (code) => Buffer.from([code, 0, 0, 0, 4]);
const flushBuffer$1 = codeOnlyBuffer(
  72
  /* code.flush */
);
const syncBuffer$1 = codeOnlyBuffer(
  83
  /* code.sync */
);
const endBuffer$1 = codeOnlyBuffer(
  88
  /* code.end */
);
const copyDoneBuffer = codeOnlyBuffer(
  99
  /* code.copyDone */
);
const serialize$1 = {
  startup,
  password,
  requestSsl,
  sendSASLInitialResponseMessage,
  sendSCRAMClientFinalMessage,
  query: query$1,
  parse: parse$3,
  bind,
  execute,
  describe,
  close,
  flush: () => flushBuffer$1,
  sync: () => syncBuffer$1,
  end: () => endBuffer$1,
  copyData,
  copyDone: () => copyDoneBuffer,
  copyFail,
  cancel
};
serializer.serialize = serialize$1;
var parser = {};
var bufferReader = {};
Object.defineProperty(bufferReader, "__esModule", { value: true });
bufferReader.BufferReader = void 0;
class BufferReader {
  constructor(offset = 0) {
    this.offset = offset;
    this.buffer = Buffer.allocUnsafe(0);
    this.encoding = "utf-8";
  }
  setBuffer(offset, buffer) {
    this.offset = offset;
    this.buffer = buffer;
  }
  int16() {
    const result2 = this.buffer.readInt16BE(this.offset);
    this.offset += 2;
    return result2;
  }
  byte() {
    const result2 = this.buffer[this.offset];
    this.offset++;
    return result2;
  }
  int32() {
    const result2 = this.buffer.readInt32BE(this.offset);
    this.offset += 4;
    return result2;
  }
  uint32() {
    const result2 = this.buffer.readUInt32BE(this.offset);
    this.offset += 4;
    return result2;
  }
  string(length) {
    const result2 = this.buffer.toString(this.encoding, this.offset, this.offset + length);
    this.offset += length;
    return result2;
  }
  cstring() {
    const start = this.offset;
    let end = start;
    while (this.buffer[end++] !== 0) {
    }
    this.offset = end;
    return this.buffer.toString(this.encoding, start, end - 1);
  }
  bytes(length) {
    const result2 = this.buffer.slice(this.offset, this.offset + length);
    this.offset += length;
    return result2;
  }
}
bufferReader.BufferReader = BufferReader;
Object.defineProperty(parser, "__esModule", { value: true });
parser.Parser = void 0;
const messages_1 = messages;
const buffer_reader_1 = bufferReader;
const CODE_LENGTH = 1;
const LEN_LENGTH = 4;
const HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
const LATEINIT_LENGTH = -1;
const emptyBuffer = Buffer.allocUnsafe(0);
class Parser {
  constructor(opts) {
    this.buffer = emptyBuffer;
    this.bufferLength = 0;
    this.bufferOffset = 0;
    this.reader = new buffer_reader_1.BufferReader();
    if ((opts === null || opts === void 0 ? void 0 : opts.mode) === "binary") {
      throw new Error("Binary mode not supported yet");
    }
    this.mode = (opts === null || opts === void 0 ? void 0 : opts.mode) || "text";
  }
  parse(buffer, callback) {
    this.mergeBuffer(buffer);
    const bufferFullLength = this.bufferOffset + this.bufferLength;
    let offset = this.bufferOffset;
    while (offset + HEADER_LENGTH <= bufferFullLength) {
      const code = this.buffer[offset];
      const length = this.buffer.readUInt32BE(offset + CODE_LENGTH);
      const fullMessageLength = CODE_LENGTH + length;
      if (fullMessageLength + offset <= bufferFullLength) {
        const message = this.handlePacket(offset + HEADER_LENGTH, code, length, this.buffer);
        callback(message);
        offset += fullMessageLength;
      } else {
        break;
      }
    }
    if (offset === bufferFullLength) {
      this.buffer = emptyBuffer;
      this.bufferLength = 0;
      this.bufferOffset = 0;
    } else {
      this.bufferLength = bufferFullLength - offset;
      this.bufferOffset = offset;
    }
  }
  mergeBuffer(buffer) {
    if (this.bufferLength > 0) {
      const newLength = this.bufferLength + buffer.byteLength;
      const newFullLength = newLength + this.bufferOffset;
      if (newFullLength > this.buffer.byteLength) {
        let newBuffer;
        if (newLength <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) {
          newBuffer = this.buffer;
        } else {
          let newBufferLength = this.buffer.byteLength * 2;
          while (newLength >= newBufferLength) {
            newBufferLength *= 2;
          }
          newBuffer = Buffer.allocUnsafe(newBufferLength);
        }
        this.buffer.copy(newBuffer, 0, this.bufferOffset, this.bufferOffset + this.bufferLength);
        this.buffer = newBuffer;
        this.bufferOffset = 0;
      }
      buffer.copy(this.buffer, this.bufferOffset + this.bufferLength);
      this.bufferLength = newLength;
    } else {
      this.buffer = buffer;
      this.bufferOffset = 0;
      this.bufferLength = buffer.byteLength;
    }
  }
  handlePacket(offset, code, length, bytes) {
    const { reader } = this;
    reader.setBuffer(offset, bytes);
    let message;
    switch (code) {
      case 50:
        message = messages_1.bindComplete;
        break;
      case 49:
        message = messages_1.parseComplete;
        break;
      case 51:
        message = messages_1.closeComplete;
        break;
      case 110:
        message = messages_1.noData;
        break;
      case 115:
        message = messages_1.portalSuspended;
        break;
      case 99:
        message = messages_1.copyDone;
        break;
      case 87:
        message = messages_1.replicationStart;
        break;
      case 73:
        message = messages_1.emptyQuery;
        break;
      case 68:
        message = parseDataRowMessage(reader);
        break;
      case 67:
        message = parseCommandCompleteMessage(reader);
        break;
      case 90:
        message = parseReadyForQueryMessage(reader);
        break;
      case 65:
        message = parseNotificationMessage(reader);
        break;
      case 82:
        message = parseAuthenticationResponse(reader, length);
        break;
      case 83:
        message = parseParameterStatusMessage(reader);
        break;
      case 75:
        message = parseBackendKeyData(reader);
        break;
      case 69:
        message = parseErrorMessage(reader, "error");
        break;
      case 78:
        message = parseErrorMessage(reader, "notice");
        break;
      case 84:
        message = parseRowDescriptionMessage(reader);
        break;
      case 116:
        message = parseParameterDescriptionMessage(reader);
        break;
      case 71:
        message = parseCopyInMessage(reader);
        break;
      case 72:
        message = parseCopyOutMessage(reader);
        break;
      case 100:
        message = parseCopyData(reader, length);
        break;
      default:
        return new messages_1.DatabaseError("received invalid response: " + code.toString(16), length, "error");
    }
    reader.setBuffer(0, emptyBuffer);
    message.length = length;
    return message;
  }
}
parser.Parser = Parser;
const parseReadyForQueryMessage = (reader) => {
  const status = reader.string(1);
  return new messages_1.ReadyForQueryMessage(LATEINIT_LENGTH, status);
};
const parseCommandCompleteMessage = (reader) => {
  const text2 = reader.cstring();
  return new messages_1.CommandCompleteMessage(LATEINIT_LENGTH, text2);
};
const parseCopyData = (reader, length) => {
  const chunk = reader.bytes(length - 4);
  return new messages_1.CopyDataMessage(LATEINIT_LENGTH, chunk);
};
const parseCopyInMessage = (reader) => parseCopyMessage(reader, "copyInResponse");
const parseCopyOutMessage = (reader) => parseCopyMessage(reader, "copyOutResponse");
const parseCopyMessage = (reader, messageName) => {
  const isBinary = reader.byte() !== 0;
  const columnCount = reader.int16();
  const message = new messages_1.CopyResponse(LATEINIT_LENGTH, messageName, isBinary, columnCount);
  for (let i = 0; i < columnCount; i++) {
    message.columnTypes[i] = reader.int16();
  }
  return message;
};
const parseNotificationMessage = (reader) => {
  const processId = reader.int32();
  const channel = reader.cstring();
  const payload = reader.cstring();
  return new messages_1.NotificationResponseMessage(LATEINIT_LENGTH, processId, channel, payload);
};
const parseRowDescriptionMessage = (reader) => {
  const fieldCount = reader.int16();
  const message = new messages_1.RowDescriptionMessage(LATEINIT_LENGTH, fieldCount);
  for (let i = 0; i < fieldCount; i++) {
    message.fields[i] = parseField(reader);
  }
  return message;
};
const parseField = (reader) => {
  const name = reader.cstring();
  const tableID = reader.uint32();
  const columnID = reader.int16();
  const dataTypeID = reader.uint32();
  const dataTypeSize = reader.int16();
  const dataTypeModifier = reader.int32();
  const mode = reader.int16() === 0 ? "text" : "binary";
  return new messages_1.Field(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, mode);
};
const parseParameterDescriptionMessage = (reader) => {
  const parameterCount = reader.int16();
  const message = new messages_1.ParameterDescriptionMessage(LATEINIT_LENGTH, parameterCount);
  for (let i = 0; i < parameterCount; i++) {
    message.dataTypeIDs[i] = reader.int32();
  }
  return message;
};
const parseDataRowMessage = (reader) => {
  const fieldCount = reader.int16();
  const fields = new Array(fieldCount);
  for (let i = 0; i < fieldCount; i++) {
    const len = reader.int32();
    fields[i] = len === -1 ? null : reader.string(len);
  }
  return new messages_1.DataRowMessage(LATEINIT_LENGTH, fields);
};
const parseParameterStatusMessage = (reader) => {
  const name = reader.cstring();
  const value = reader.cstring();
  return new messages_1.ParameterStatusMessage(LATEINIT_LENGTH, name, value);
};
const parseBackendKeyData = (reader) => {
  const processID = reader.int32();
  const secretKey = reader.int32();
  return new messages_1.BackendKeyDataMessage(LATEINIT_LENGTH, processID, secretKey);
};
const parseAuthenticationResponse = (reader, length) => {
  const code = reader.int32();
  const message = {
    name: "authenticationOk",
    length
  };
  switch (code) {
    case 0:
      break;
    case 3:
      if (message.length === 8) {
        message.name = "authenticationCleartextPassword";
      }
      break;
    case 5:
      if (message.length === 12) {
        message.name = "authenticationMD5Password";
        const salt = reader.bytes(4);
        return new messages_1.AuthenticationMD5Password(LATEINIT_LENGTH, salt);
      }
      break;
    case 10:
      {
        message.name = "authenticationSASL";
        message.mechanisms = [];
        let mechanism;
        do {
          mechanism = reader.cstring();
          if (mechanism) {
            message.mechanisms.push(mechanism);
          }
        } while (mechanism);
      }
      break;
    case 11:
      message.name = "authenticationSASLContinue";
      message.data = reader.string(length - 8);
      break;
    case 12:
      message.name = "authenticationSASLFinal";
      message.data = reader.string(length - 8);
      break;
    default:
      throw new Error("Unknown authenticationOk message type " + code);
  }
  return message;
};
const parseErrorMessage = (reader, name) => {
  const fields = {};
  let fieldType = reader.string(1);
  while (fieldType !== "\0") {
    fields[fieldType] = reader.cstring();
    fieldType = reader.string(1);
  }
  const messageValue = fields.M;
  const message = name === "notice" ? new messages_1.NoticeMessage(LATEINIT_LENGTH, messageValue) : new messages_1.DatabaseError(messageValue, LATEINIT_LENGTH, name);
  message.severity = fields.S;
  message.code = fields.C;
  message.detail = fields.D;
  message.hint = fields.H;
  message.position = fields.P;
  message.internalPosition = fields.p;
  message.internalQuery = fields.q;
  message.where = fields.W;
  message.schema = fields.s;
  message.table = fields.t;
  message.column = fields.c;
  message.dataType = fields.d;
  message.constraint = fields.n;
  message.file = fields.F;
  message.line = fields.L;
  message.routine = fields.R;
  return message;
};
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.DatabaseError = exports$1.serialize = exports$1.parse = void 0;
  const messages_12 = messages;
  Object.defineProperty(exports$1, "DatabaseError", { enumerable: true, get: function() {
    return messages_12.DatabaseError;
  } });
  const serializer_1 = serializer;
  Object.defineProperty(exports$1, "serialize", { enumerable: true, get: function() {
    return serializer_1.serialize;
  } });
  const parser_1 = parser;
  function parse2(stream2, callback) {
    const parser2 = new parser_1.Parser();
    stream2.on("data", (buffer) => parser2.parse(buffer, callback));
    return new Promise((resolve) => stream2.on("end", () => resolve()));
  }
  exports$1.parse = parse2;
})(dist);
var empty = {};
var hasRequiredEmpty;
function requireEmpty() {
  if (hasRequiredEmpty) return empty;
  hasRequiredEmpty = 1;
  Object.defineProperty(empty, "__esModule", { value: true });
  empty.default = {};
  return empty;
}
const { getStream: getStream$1, getSecureStream: getSecureStream$1 } = getStreamFuncs();
var stream = {
  /**
   * Get a socket stream compatible with the current runtime environment.
   * @returns {Duplex}
   */
  getStream: getStream$1,
  /**
   * Get a TLS secured socket, compatible with the current environment,
   * using the socket and other settings given in `options`.
   * @returns {Duplex}
   */
  getSecureStream: getSecureStream$1
};
function getNodejsStreamFuncs() {
  function getStream2(ssl) {
    const net = require$$0$4;
    return new net.Socket();
  }
  function getSecureStream2(options) {
    const tls = require$$1$2;
    return tls.connect(options);
  }
  return {
    getStream: getStream2,
    getSecureStream: getSecureStream2
  };
}
function getCloudflareStreamFuncs() {
  function getStream2(ssl) {
    const { CloudflareSocket } = requireEmpty();
    return new CloudflareSocket(ssl);
  }
  function getSecureStream2(options) {
    options.socket.startTls(options);
    return options.socket;
  }
  return {
    getStream: getStream2,
    getSecureStream: getSecureStream2
  };
}
function isCloudflareRuntime() {
  if (typeof navigator === "object" && navigator !== null && typeof navigator.userAgent === "string") {
    return navigator.userAgent === "Cloudflare-Workers";
  }
  if (typeof Response === "function") {
    const resp = new Response(null, { cf: { thing: true } });
    if (typeof resp.cf === "object" && resp.cf !== null && resp.cf.thing) {
      return true;
    }
  }
  return false;
}
function getStreamFuncs() {
  if (isCloudflareRuntime()) {
    return getCloudflareStreamFuncs();
  }
  return getNodejsStreamFuncs();
}
const EventEmitter$1 = require$$0$3.EventEmitter;
const { parse: parse$2, serialize } = dist;
const { getStream, getSecureStream } = stream;
const flushBuffer = serialize.flush();
const syncBuffer = serialize.sync();
const endBuffer = serialize.end();
let Connection$1 = class Connection extends EventEmitter$1 {
  constructor(config2) {
    super();
    config2 = config2 || {};
    this.stream = config2.stream || getStream(config2.ssl);
    if (typeof this.stream === "function") {
      this.stream = this.stream(config2);
    }
    this._keepAlive = config2.keepAlive;
    this._keepAliveInitialDelayMillis = config2.keepAliveInitialDelayMillis;
    this.parsedStatements = {};
    this.ssl = config2.ssl || false;
    this._ending = false;
    this._emitMessage = false;
    const self2 = this;
    this.on("newListener", function(eventName) {
      if (eventName === "message") {
        self2._emitMessage = true;
      }
    });
  }
  connect(port, host) {
    const self2 = this;
    this._connecting = true;
    this.stream.setNoDelay(true);
    this.stream.connect(port, host);
    this.stream.once("connect", function() {
      if (self2._keepAlive) {
        self2.stream.setKeepAlive(true, self2._keepAliveInitialDelayMillis);
      }
      self2.emit("connect");
    });
    const reportStreamError = function(error2) {
      if (self2._ending && (error2.code === "ECONNRESET" || error2.code === "EPIPE")) {
        return;
      }
      self2.emit("error", error2);
    };
    this.stream.on("error", reportStreamError);
    this.stream.on("close", function() {
      self2.emit("end");
    });
    if (!this.ssl) {
      return this.attachListeners(this.stream);
    }
    this.stream.once("data", function(buffer) {
      const responseCode = buffer.toString("utf8");
      switch (responseCode) {
        case "S":
          break;
        case "N":
          self2.stream.end();
          return self2.emit("error", new Error("The server does not support SSL connections"));
        default:
          self2.stream.end();
          return self2.emit("error", new Error("There was an error establishing an SSL connection"));
      }
      const options = {
        socket: self2.stream
      };
      if (self2.ssl !== true) {
        Object.assign(options, self2.ssl);
        if ("key" in self2.ssl) {
          options.key = self2.ssl.key;
        }
      }
      const net = require$$0$4;
      if (net.isIP && net.isIP(host) === 0) {
        options.servername = host;
      }
      try {
        self2.stream = getSecureStream(options);
      } catch (err) {
        return self2.emit("error", err);
      }
      self2.attachListeners(self2.stream);
      self2.stream.on("error", reportStreamError);
      self2.emit("sslconnect");
    });
  }
  attachListeners(stream2) {
    parse$2(stream2, (msg) => {
      const eventName = msg.name === "error" ? "errorMessage" : msg.name;
      if (this._emitMessage) {
        this.emit("message", msg);
      }
      this.emit(eventName, msg);
    });
  }
  requestSsl() {
    this.stream.write(serialize.requestSsl());
  }
  startup(config2) {
    this.stream.write(serialize.startup(config2));
  }
  cancel(processID, secretKey) {
    this._send(serialize.cancel(processID, secretKey));
  }
  password(password2) {
    this._send(serialize.password(password2));
  }
  sendSASLInitialResponseMessage(mechanism, initialResponse) {
    this._send(serialize.sendSASLInitialResponseMessage(mechanism, initialResponse));
  }
  sendSCRAMClientFinalMessage(additionalData) {
    this._send(serialize.sendSCRAMClientFinalMessage(additionalData));
  }
  _send(buffer) {
    if (!this.stream.writable) {
      return false;
    }
    return this.stream.write(buffer);
  }
  query(text2) {
    this._send(serialize.query(text2));
  }
  // send parse message
  parse(query2) {
    this._send(serialize.parse(query2));
  }
  // send bind message
  bind(config2) {
    this._send(serialize.bind(config2));
  }
  // send execute message
  execute(config2) {
    this._send(serialize.execute(config2));
  }
  flush() {
    if (this.stream.writable) {
      this.stream.write(flushBuffer);
    }
  }
  sync() {
    this._ending = true;
    this._send(syncBuffer);
  }
  ref() {
    this.stream.ref();
  }
  unref() {
    this.stream.unref();
  }
  end() {
    this._ending = true;
    if (!this._connecting || !this.stream.writable) {
      this.stream.end();
      return;
    }
    return this.stream.write(endBuffer, () => {
      this.stream.end();
    });
  }
  close(msg) {
    this._send(serialize.close(msg));
  }
  describe(msg) {
    this._send(serialize.describe(msg));
  }
  sendCopyFromChunk(chunk) {
    this._send(serialize.copyData(chunk));
  }
  endCopyFrom() {
    this._send(serialize.copyDone());
  }
  sendCopyFail(msg) {
    this._send(serialize.copyFail(msg));
  }
};
var connection = Connection$1;
var lib = { exports: {} };
var helper = { exports: {} };
var split2;
var hasRequiredSplit2;
function requireSplit2() {
  if (hasRequiredSplit2) return split2;
  hasRequiredSplit2 = 1;
  const { Transform } = require$$0$5;
  const { StringDecoder } = require$$1$3;
  const kLast = /* @__PURE__ */ Symbol("last");
  const kDecoder = /* @__PURE__ */ Symbol("decoder");
  function transform2(chunk, enc, cb) {
    let list;
    if (this.overflow) {
      const buf = this[kDecoder].write(chunk);
      list = buf.split(this.matcher);
      if (list.length === 1) return cb();
      list.shift();
      this.overflow = false;
    } else {
      this[kLast] += this[kDecoder].write(chunk);
      list = this[kLast].split(this.matcher);
    }
    this[kLast] = list.pop();
    for (let i = 0; i < list.length; i++) {
      try {
        push(this, this.mapper(list[i]));
      } catch (error2) {
        return cb(error2);
      }
    }
    this.overflow = this[kLast].length > this.maxLength;
    if (this.overflow && !this.skipOverflow) {
      cb(new Error("maximum buffer reached"));
      return;
    }
    cb();
  }
  function flush(cb) {
    this[kLast] += this[kDecoder].end();
    if (this[kLast]) {
      try {
        push(this, this.mapper(this[kLast]));
      } catch (error2) {
        return cb(error2);
      }
    }
    cb();
  }
  function push(self2, val2) {
    if (val2 !== void 0) {
      self2.push(val2);
    }
  }
  function noop(incoming) {
    return incoming;
  }
  function split(matcher, mapper, options) {
    matcher = matcher || /\r?\n/;
    mapper = mapper || noop;
    options = options || {};
    switch (arguments.length) {
      case 1:
        if (typeof matcher === "function") {
          mapper = matcher;
          matcher = /\r?\n/;
        } else if (typeof matcher === "object" && !(matcher instanceof RegExp) && !matcher[Symbol.split]) {
          options = matcher;
          matcher = /\r?\n/;
        }
        break;
      case 2:
        if (typeof matcher === "function") {
          options = mapper;
          mapper = matcher;
          matcher = /\r?\n/;
        } else if (typeof mapper === "object") {
          options = mapper;
          mapper = noop;
        }
    }
    options = Object.assign({}, options);
    options.autoDestroy = true;
    options.transform = transform2;
    options.flush = flush;
    options.readableObjectMode = true;
    const stream2 = new Transform(options);
    stream2[kLast] = "";
    stream2[kDecoder] = new StringDecoder("utf8");
    stream2.matcher = matcher;
    stream2.mapper = mapper;
    stream2.maxLength = options.maxLength;
    stream2.skipOverflow = options.skipOverflow || false;
    stream2.overflow = false;
    stream2._destroy = function(err, cb) {
      this._writableState.errorEmitted = false;
      cb(err);
    };
    return stream2;
  }
  split2 = split;
  return split2;
}
var hasRequiredHelper;
function requireHelper() {
  if (hasRequiredHelper) return helper.exports;
  hasRequiredHelper = 1;
  (function(module) {
    var path = require$$0$6, Stream = require$$0$5.Stream, split = requireSplit2(), util2 = require$$1$1, defaultPort = 5432, isWin = process.platform === "win32", warnStream = process.stderr;
    var S_IRWXG = 56, S_IRWXO = 7, S_IFMT = 61440, S_IFREG = 32768;
    function isRegFile(mode) {
      return (mode & S_IFMT) == S_IFREG;
    }
    var fieldNames = ["host", "port", "database", "user", "password"];
    var nrOfFields = fieldNames.length;
    var passKey = fieldNames[nrOfFields - 1];
    function warn() {
      var isWritable = warnStream instanceof Stream && true === warnStream.writable;
      if (isWritable) {
        var args = Array.prototype.slice.call(arguments).concat("\n");
        warnStream.write(util2.format.apply(util2, args));
      }
    }
    Object.defineProperty(module.exports, "isWin", {
      get: function() {
        return isWin;
      },
      set: function(val2) {
        isWin = val2;
      }
    });
    module.exports.warnTo = function(stream2) {
      var old = warnStream;
      warnStream = stream2;
      return old;
    };
    module.exports.getFileName = function(rawEnv) {
      var env = rawEnv || process.env;
      var file2 = env.PGPASSFILE || (isWin ? path.join(env.APPDATA || "./", "postgresql", "pgpass.conf") : path.join(env.HOME || "./", ".pgpass"));
      return file2;
    };
    module.exports.usePgPass = function(stats, fname) {
      if (Object.prototype.hasOwnProperty.call(process.env, "PGPASSWORD")) {
        return false;
      }
      if (isWin) {
        return true;
      }
      fname = fname || "<unkn>";
      if (!isRegFile(stats.mode)) {
        warn('WARNING: password file "%s" is not a plain file', fname);
        return false;
      }
      if (stats.mode & (S_IRWXG | S_IRWXO)) {
        warn('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', fname);
        return false;
      }
      return true;
    };
    var matcher = module.exports.match = function(connInfo, entry) {
      return fieldNames.slice(0, -1).reduce(function(prev, field, idx) {
        if (idx == 1) {
          if (Number(connInfo[field] || defaultPort) === Number(entry[field])) {
            return prev && true;
          }
        }
        return prev && (entry[field] === "*" || entry[field] === connInfo[field]);
      }, true);
    };
    module.exports.getPassword = function(connInfo, stream2, cb) {
      var pass;
      var lineStream = stream2.pipe(split());
      function onLine(line) {
        var entry = parseLine(line);
        if (entry && isValidEntry(entry) && matcher(connInfo, entry)) {
          pass = entry[passKey];
          lineStream.end();
        }
      }
      var onEnd = function() {
        stream2.destroy();
        cb(pass);
      };
      var onErr = function(err) {
        stream2.destroy();
        warn("WARNING: error on reading file: %s", err);
        cb(void 0);
      };
      stream2.on("error", onErr);
      lineStream.on("data", onLine).on("end", onEnd).on("error", onErr);
    };
    var parseLine = module.exports.parseLine = function(line) {
      if (line.length < 11 || line.match(/^\s+#/)) {
        return null;
      }
      var curChar = "";
      var prevChar = "";
      var fieldIdx = 0;
      var startIdx = 0;
      var obj = {};
      var isLastField = false;
      var addToObj = function(idx, i0, i1) {
        var field = line.substring(i0, i1);
        if (!Object.hasOwnProperty.call(process.env, "PGPASS_NO_DEESCAPE")) {
          field = field.replace(/\\([:\\])/g, "$1");
        }
        obj[fieldNames[idx]] = field;
      };
      for (var i = 0; i < line.length - 1; i += 1) {
        curChar = line.charAt(i + 1);
        prevChar = line.charAt(i);
        isLastField = fieldIdx == nrOfFields - 1;
        if (isLastField) {
          addToObj(fieldIdx, startIdx);
          break;
        }
        if (i >= 0 && curChar == ":" && prevChar !== "\\") {
          addToObj(fieldIdx, startIdx, i + 1);
          startIdx = i + 2;
          fieldIdx += 1;
        }
      }
      obj = Object.keys(obj).length === nrOfFields ? obj : null;
      return obj;
    };
    var isValidEntry = module.exports.isValidEntry = function(entry) {
      var rules = {
        // host
        0: function(x) {
          return x.length > 0;
        },
        // port
        1: function(x) {
          if (x === "*") {
            return true;
          }
          x = Number(x);
          return isFinite(x) && x > 0 && x < 9007199254740992 && Math.floor(x) === x;
        },
        // database
        2: function(x) {
          return x.length > 0;
        },
        // username
        3: function(x) {
          return x.length > 0;
        },
        // password
        4: function(x) {
          return x.length > 0;
        }
      };
      for (var idx = 0; idx < fieldNames.length; idx += 1) {
        var rule = rules[idx];
        var value = entry[fieldNames[idx]] || "";
        var res = rule(value);
        if (!res) {
          return false;
        }
      }
      return true;
    };
  })(helper);
  return helper.exports;
}
var hasRequiredLib$1;
function requireLib$1() {
  if (hasRequiredLib$1) return lib.exports;
  hasRequiredLib$1 = 1;
  var fs = require$$0$1, helper2 = requireHelper();
  lib.exports = function(connInfo, cb) {
    var file2 = helper2.getFileName();
    fs.stat(file2, function(err, stat) {
      if (err || !helper2.usePgPass(stat, file2)) {
        return cb(void 0);
      }
      var st = fs.createReadStream(file2);
      helper2.getPassword(connInfo, st, cb);
    });
  };
  lib.exports.warnTo = helper2.warnTo;
  return lib.exports;
}
const EventEmitter = require$$0$3.EventEmitter;
const utils = utils$3;
const nodeUtils = require$$1$1;
const sasl = sasl$1;
const TypeOverrides = typeOverrides;
const ConnectionParameters2 = connectionParameters;
const Query2 = query$2;
const defaults = defaultsExports;
const Connection2 = connection;
const crypto = utilsExports;
const activeQueryDeprecationNotice = nodeUtils.deprecate(
  () => {
  },
  "Client.activeQuery is deprecated and will be removed in pg@9.0"
);
const queryQueueDeprecationNotice = nodeUtils.deprecate(
  () => {
  },
  "Client.queryQueue is deprecated and will be removed in pg@9.0."
);
const pgPassDeprecationNotice = nodeUtils.deprecate(
  () => {
  },
  "pgpass support is deprecated and will be removed in pg@9.0. You can provide an async function as the password property to the Client/Pool constructor that returns a password instead. Within this function you can call the pgpass module in your own code."
);
const byoPromiseDeprecationNotice = nodeUtils.deprecate(
  () => {
  },
  "Passing a custom Promise implementation to the Client/Pool constructor is deprecated and will be removed in pg@9.0."
);
const queryQueueLengthDeprecationNotice = nodeUtils.deprecate(
  () => {
  },
  "Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead."
);
class Client extends EventEmitter {
  constructor(config2) {
    super();
    this.connectionParameters = new ConnectionParameters2(config2);
    this.user = this.connectionParameters.user;
    this.database = this.connectionParameters.database;
    this.port = this.connectionParameters.port;
    this.host = this.connectionParameters.host;
    Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: this.connectionParameters.password
    });
    this.replication = this.connectionParameters.replication;
    const c = config2 || {};
    if (c.Promise) {
      byoPromiseDeprecationNotice();
    }
    this._Promise = c.Promise || commonjsGlobal.Promise;
    this._types = new TypeOverrides(c.types);
    this._ending = false;
    this._ended = false;
    this._connecting = false;
    this._connected = false;
    this._connectionError = false;
    this._queryable = true;
    this._activeQuery = null;
    this.enableChannelBinding = Boolean(c.enableChannelBinding);
    this.connection = c.connection || new Connection2({
      stream: c.stream,
      ssl: this.connectionParameters.ssl,
      keepAlive: c.keepAlive || false,
      keepAliveInitialDelayMillis: c.keepAliveInitialDelayMillis || 0,
      encoding: this.connectionParameters.client_encoding || "utf8"
    });
    this._queryQueue = [];
    this.binary = c.binary || defaults.binary;
    this.processID = null;
    this.secretKey = null;
    this.ssl = this.connectionParameters.ssl || false;
    if (this.ssl && this.ssl.key) {
      Object.defineProperty(this.ssl, "key", {
        enumerable: false
      });
    }
    this._connectionTimeoutMillis = c.connectionTimeoutMillis || 0;
  }
  get activeQuery() {
    activeQueryDeprecationNotice();
    return this._activeQuery;
  }
  set activeQuery(val2) {
    activeQueryDeprecationNotice();
    this._activeQuery = val2;
  }
  _getActiveQuery() {
    return this._activeQuery;
  }
  _errorAllQueries(err) {
    const enqueueError = (query2) => {
      process.nextTick(() => {
        query2.handleError(err, this.connection);
      });
    };
    const activeQuery = this._getActiveQuery();
    if (activeQuery) {
      enqueueError(activeQuery);
      this._activeQuery = null;
    }
    this._queryQueue.forEach(enqueueError);
    this._queryQueue.length = 0;
  }
  _connect(callback) {
    const self2 = this;
    const con = this.connection;
    this._connectionCallback = callback;
    if (this._connecting || this._connected) {
      const err = new Error("Client has already been connected. You cannot reuse a client.");
      process.nextTick(() => {
        callback(err);
      });
      return;
    }
    this._connecting = true;
    if (this._connectionTimeoutMillis > 0) {
      this.connectionTimeoutHandle = setTimeout(() => {
        con._ending = true;
        con.stream.destroy(new Error("timeout expired"));
      }, this._connectionTimeoutMillis);
      if (this.connectionTimeoutHandle.unref) {
        this.connectionTimeoutHandle.unref();
      }
    }
    if (this.host && this.host.indexOf("/") === 0) {
      con.connect(this.host + "/.s.PGSQL." + this.port);
    } else {
      con.connect(this.port, this.host);
    }
    con.on("connect", function() {
      if (self2.ssl) {
        con.requestSsl();
      } else {
        con.startup(self2.getStartupConf());
      }
    });
    con.on("sslconnect", function() {
      con.startup(self2.getStartupConf());
    });
    this._attachListeners(con);
    con.once("end", () => {
      const error2 = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
      clearTimeout(this.connectionTimeoutHandle);
      this._errorAllQueries(error2);
      this._ended = true;
      if (!this._ending) {
        if (this._connecting && !this._connectionError) {
          if (this._connectionCallback) {
            this._connectionCallback(error2);
          } else {
            this._handleErrorEvent(error2);
          }
        } else if (!this._connectionError) {
          this._handleErrorEvent(error2);
        }
      }
      process.nextTick(() => {
        this.emit("end");
      });
    });
  }
  connect(callback) {
    if (callback) {
      this._connect(callback);
      return;
    }
    return new this._Promise((resolve, reject) => {
      this._connect((error2) => {
        if (error2) {
          reject(error2);
        } else {
          resolve(this);
        }
      });
    });
  }
  _attachListeners(con) {
    con.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this));
    con.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this));
    con.on("authenticationSASL", this._handleAuthSASL.bind(this));
    con.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this));
    con.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this));
    con.on("backendKeyData", this._handleBackendKeyData.bind(this));
    con.on("error", this._handleErrorEvent.bind(this));
    con.on("errorMessage", this._handleErrorMessage.bind(this));
    con.on("readyForQuery", this._handleReadyForQuery.bind(this));
    con.on("notice", this._handleNotice.bind(this));
    con.on("rowDescription", this._handleRowDescription.bind(this));
    con.on("dataRow", this._handleDataRow.bind(this));
    con.on("portalSuspended", this._handlePortalSuspended.bind(this));
    con.on("emptyQuery", this._handleEmptyQuery.bind(this));
    con.on("commandComplete", this._handleCommandComplete.bind(this));
    con.on("parseComplete", this._handleParseComplete.bind(this));
    con.on("copyInResponse", this._handleCopyInResponse.bind(this));
    con.on("copyData", this._handleCopyData.bind(this));
    con.on("notification", this._handleNotification.bind(this));
  }
  _getPassword(cb) {
    const con = this.connection;
    if (typeof this.password === "function") {
      this._Promise.resolve().then(() => this.password(this.connectionParameters)).then((pass) => {
        if (pass !== void 0) {
          if (typeof pass !== "string") {
            con.emit("error", new TypeError("Password must be a string"));
            return;
          }
          this.connectionParameters.password = this.password = pass;
        } else {
          this.connectionParameters.password = this.password = null;
        }
        cb();
      }).catch((err) => {
        con.emit("error", err);
      });
    } else if (this.password !== null) {
      cb();
    } else {
      try {
        const pgPass = requireLib$1();
        pgPass(this.connectionParameters, (pass) => {
          if (void 0 !== pass) {
            pgPassDeprecationNotice();
            this.connectionParameters.password = this.password = pass;
          }
          cb();
        });
      } catch (e) {
        this.emit("error", e);
      }
    }
  }
  _handleAuthCleartextPassword(msg) {
    this._getPassword(() => {
      this.connection.password(this.password);
    });
  }
  _handleAuthMD5Password(msg) {
    this._getPassword(async () => {
      try {
        const hashedPassword = await crypto.postgresMd5PasswordHash(this.user, this.password, msg.salt);
        this.connection.password(hashedPassword);
      } catch (e) {
        this.emit("error", e);
      }
    });
  }
  _handleAuthSASL(msg) {
    this._getPassword(() => {
      try {
        this.saslSession = sasl.startSession(msg.mechanisms, this.enableChannelBinding && this.connection.stream);
        this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
      } catch (err) {
        this.connection.emit("error", err);
      }
    });
  }
  async _handleAuthSASLContinue(msg) {
    try {
      await sasl.continueSession(
        this.saslSession,
        this.password,
        msg.data,
        this.enableChannelBinding && this.connection.stream
      );
      this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
    } catch (err) {
      this.connection.emit("error", err);
    }
  }
  _handleAuthSASLFinal(msg) {
    try {
      sasl.finalizeSession(this.saslSession, msg.data);
      this.saslSession = null;
    } catch (err) {
      this.connection.emit("error", err);
    }
  }
  _handleBackendKeyData(msg) {
    this.processID = msg.processID;
    this.secretKey = msg.secretKey;
  }
  _handleReadyForQuery(msg) {
    if (this._connecting) {
      this._connecting = false;
      this._connected = true;
      clearTimeout(this.connectionTimeoutHandle);
      if (this._connectionCallback) {
        this._connectionCallback(null, this);
        this._connectionCallback = null;
      }
      this.emit("connect");
    }
    const activeQuery = this._getActiveQuery();
    this._activeQuery = null;
    this.readyForQuery = true;
    if (activeQuery) {
      activeQuery.handleReadyForQuery(this.connection);
    }
    this._pulseQueryQueue();
  }
  // if we receive an error event or error message
  // during the connection process we handle it here
  _handleErrorWhileConnecting(err) {
    if (this._connectionError) {
      return;
    }
    this._connectionError = true;
    clearTimeout(this.connectionTimeoutHandle);
    if (this._connectionCallback) {
      return this._connectionCallback(err);
    }
    this.emit("error", err);
  }
  // if we're connected and we receive an error event from the connection
  // this means the socket is dead - do a hard abort of all queries and emit
  // the socket error on the client as well
  _handleErrorEvent(err) {
    if (this._connecting) {
      return this._handleErrorWhileConnecting(err);
    }
    this._queryable = false;
    this._errorAllQueries(err);
    this.emit("error", err);
  }
  // handle error messages from the postgres backend
  _handleErrorMessage(msg) {
    if (this._connecting) {
      return this._handleErrorWhileConnecting(msg);
    }
    const activeQuery = this._getActiveQuery();
    if (!activeQuery) {
      this._handleErrorEvent(msg);
      return;
    }
    this._activeQuery = null;
    activeQuery.handleError(msg, this.connection);
  }
  _handleRowDescription(msg) {
    const activeQuery = this._getActiveQuery();
    if (activeQuery == null) {
      const error2 = new Error("Received unexpected rowDescription message from backend.");
      this._handleErrorEvent(error2);
      return;
    }
    activeQuery.handleRowDescription(msg);
  }
  _handleDataRow(msg) {
    const activeQuery = this._getActiveQuery();
    if (activeQuery == null) {
      const error2 = new Error("Received unexpected dataRow message from backend.");
      this._handleErrorEvent(error2);
      return;
    }
    activeQuery.handleDataRow(msg);
  }
  _handlePortalSuspended(msg) {
    const activeQuery = this._getActiveQuery();
    if (activeQuery == null) {
      const error2 = new Error("Received unexpected portalSuspended message from backend.");
      this._handleErrorEvent(error2);
      return;
    }
    activeQuery.handlePortalSuspended(this.connection);
  }
  _handleEmptyQuery(msg) {
    const activeQuery = this._getActiveQuery();
    if (activeQuery == null) {
      const error2 = new Error("Received unexpected emptyQuery message from backend.");
      this._handleErrorEvent(error2);
      return;
    }
    activeQuery.handleEmptyQuery(this.connection);
  }
  _handleCommandComplete(msg) {
    const activeQuery = this._getActiveQuery();
    if (activeQuery == null) {
      const error2 = new Error("Received unexpected commandComplete message from backend.");
      this._handleErrorEvent(error2);
      return;
    }
    activeQuery.handleCommandComplete(msg, this.connection);
  }
  _handleParseComplete() {
    const activeQuery = this._getActiveQuery();
    if (activeQuery == null) {
      const error2 = new Error("Received unexpected parseComplete message from backend.");
      this._handleErrorEvent(error2);
      return;
    }
    if (activeQuery.name) {
      this.connection.parsedStatements[activeQuery.name] = activeQuery.text;
    }
  }
  _handleCopyInResponse(msg) {
    const activeQuery = this._getActiveQuery();
    if (activeQuery == null) {
      const error2 = new Error("Received unexpected copyInResponse message from backend.");
      this._handleErrorEvent(error2);
      return;
    }
    activeQuery.handleCopyInResponse(this.connection);
  }
  _handleCopyData(msg) {
    const activeQuery = this._getActiveQuery();
    if (activeQuery == null) {
      const error2 = new Error("Received unexpected copyData message from backend.");
      this._handleErrorEvent(error2);
      return;
    }
    activeQuery.handleCopyData(msg, this.connection);
  }
  _handleNotification(msg) {
    this.emit("notification", msg);
  }
  _handleNotice(msg) {
    this.emit("notice", msg);
  }
  getStartupConf() {
    const params = this.connectionParameters;
    const data = {
      user: params.user,
      database: params.database
    };
    const appName = params.application_name || params.fallback_application_name;
    if (appName) {
      data.application_name = appName;
    }
    if (params.replication) {
      data.replication = "" + params.replication;
    }
    if (params.statement_timeout) {
      data.statement_timeout = String(parseInt(params.statement_timeout, 10));
    }
    if (params.lock_timeout) {
      data.lock_timeout = String(parseInt(params.lock_timeout, 10));
    }
    if (params.idle_in_transaction_session_timeout) {
      data.idle_in_transaction_session_timeout = String(parseInt(params.idle_in_transaction_session_timeout, 10));
    }
    if (params.options) {
      data.options = params.options;
    }
    return data;
  }
  cancel(client2, query2) {
    if (client2.activeQuery === query2) {
      const con = this.connection;
      if (this.host && this.host.indexOf("/") === 0) {
        con.connect(this.host + "/.s.PGSQL." + this.port);
      } else {
        con.connect(this.port, this.host);
      }
      con.on("connect", function() {
        con.cancel(client2.processID, client2.secretKey);
      });
    } else if (client2._queryQueue.indexOf(query2) !== -1) {
      client2._queryQueue.splice(client2._queryQueue.indexOf(query2), 1);
    }
  }
  setTypeParser(oid, format, parseFn) {
    return this._types.setTypeParser(oid, format, parseFn);
  }
  getTypeParser(oid, format) {
    return this._types.getTypeParser(oid, format);
  }
  // escapeIdentifier and escapeLiteral moved to utility functions & exported
  // on PG
  // re-exported here for backwards compatibility
  escapeIdentifier(str) {
    return utils.escapeIdentifier(str);
  }
  escapeLiteral(str) {
    return utils.escapeLiteral(str);
  }
  _pulseQueryQueue() {
    if (this.readyForQuery === true) {
      this._activeQuery = this._queryQueue.shift();
      const activeQuery = this._getActiveQuery();
      if (activeQuery) {
        this.readyForQuery = false;
        this.hasExecuted = true;
        const queryError = activeQuery.submit(this.connection);
        if (queryError) {
          process.nextTick(() => {
            activeQuery.handleError(queryError, this.connection);
            this.readyForQuery = true;
            this._pulseQueryQueue();
          });
        }
      } else if (this.hasExecuted) {
        this._activeQuery = null;
        this.emit("drain");
      }
    }
  }
  query(config2, values, callback) {
    let query2;
    let result2;
    let readTimeout;
    let readTimeoutTimer;
    let queryCallback;
    if (config2 === null || config2 === void 0) {
      throw new TypeError("Client was passed a null or undefined query");
    } else if (typeof config2.submit === "function") {
      readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
      result2 = query2 = config2;
      if (!query2.callback) {
        if (typeof values === "function") {
          query2.callback = values;
        } else if (callback) {
          query2.callback = callback;
        }
      }
    } else {
      readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
      query2 = new Query2(config2, values, callback);
      if (!query2.callback) {
        result2 = new this._Promise((resolve, reject) => {
          query2.callback = (err, res) => err ? reject(err) : resolve(res);
        }).catch((err) => {
          Error.captureStackTrace(err);
          throw err;
        });
      }
    }
    if (readTimeout) {
      queryCallback = query2.callback || (() => {
      });
      readTimeoutTimer = setTimeout(() => {
        const error2 = new Error("Query read timeout");
        process.nextTick(() => {
          query2.handleError(error2, this.connection);
        });
        queryCallback(error2);
        query2.callback = () => {
        };
        const index2 = this._queryQueue.indexOf(query2);
        if (index2 > -1) {
          this._queryQueue.splice(index2, 1);
        }
        this._pulseQueryQueue();
      }, readTimeout);
      query2.callback = (err, res) => {
        clearTimeout(readTimeoutTimer);
        queryCallback(err, res);
      };
    }
    if (this.binary && !query2.binary) {
      query2.binary = true;
    }
    if (query2._result && !query2._result._types) {
      query2._result._types = this._types;
    }
    if (!this._queryable) {
      process.nextTick(() => {
        query2.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
      });
      return result2;
    }
    if (this._ending) {
      process.nextTick(() => {
        query2.handleError(new Error("Client was closed and is not queryable"), this.connection);
      });
      return result2;
    }
    if (this._queryQueue.length > 0) {
      queryQueueLengthDeprecationNotice();
    }
    this._queryQueue.push(query2);
    this._pulseQueryQueue();
    return result2;
  }
  ref() {
    this.connection.ref();
  }
  unref() {
    this.connection.unref();
  }
  end(cb) {
    this._ending = true;
    if (!this.connection._connecting || this._ended) {
      if (cb) {
        cb();
      } else {
        return this._Promise.resolve();
      }
    }
    if (this._getActiveQuery() || !this._queryable) {
      this.connection.stream.destroy();
    } else {
      this.connection.end();
    }
    if (cb) {
      this.connection.once("end", cb);
    } else {
      return new this._Promise((resolve) => {
        this.connection.once("end", resolve);
      });
    }
  }
  get queryQueue() {
    queryQueueDeprecationNotice();
    return this._queryQueue;
  }
}
Client.Query = Query2;
var client$1 = Client;
var pgPool;
var hasRequiredPgPool;
function requirePgPool() {
  if (hasRequiredPgPool) return pgPool;
  hasRequiredPgPool = 1;
  const EventEmitter2 = require$$0$3.EventEmitter;
  const NOOP = function() {
  };
  const removeWhere = (list, predicate) => {
    const i = list.findIndex(predicate);
    return i === -1 ? void 0 : list.splice(i, 1)[0];
  };
  class IdleItem {
    constructor(client2, idleListener, timeoutId) {
      this.client = client2;
      this.idleListener = idleListener;
      this.timeoutId = timeoutId;
    }
  }
  class PendingItem {
    constructor(callback) {
      this.callback = callback;
    }
  }
  function throwOnDoubleRelease() {
    throw new Error("Release called on client which has already been released to the pool.");
  }
  function promisify(Promise2, callback) {
    if (callback) {
      return { callback, result: void 0 };
    }
    let rej;
    let res;
    const cb = function(err, client2) {
      err ? rej(err) : res(client2);
    };
    const result2 = new Promise2(function(resolve, reject) {
      res = resolve;
      rej = reject;
    }).catch((err) => {
      Error.captureStackTrace(err);
      throw err;
    });
    return { callback: cb, result: result2 };
  }
  function makeIdleListener(pool2, client2) {
    return function idleListener(err) {
      err.client = client2;
      client2.removeListener("error", idleListener);
      client2.on("error", () => {
        pool2.log("additional client error after disconnection due to error", err);
      });
      pool2._remove(client2);
      pool2.emit("error", err, client2);
    };
  }
  class Pool2 extends EventEmitter2 {
    constructor(options, Client2) {
      super();
      this.options = Object.assign({}, options);
      if (options != null && "password" in options) {
        Object.defineProperty(this.options, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: options.password
        });
      }
      if (options != null && options.ssl && options.ssl.key) {
        Object.defineProperty(this.options.ssl, "key", {
          enumerable: false
        });
      }
      this.options.max = this.options.max || this.options.poolSize || 10;
      this.options.min = this.options.min || 0;
      this.options.maxUses = this.options.maxUses || Infinity;
      this.options.allowExitOnIdle = this.options.allowExitOnIdle || false;
      this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0;
      this.log = this.options.log || function() {
      };
      this.Client = this.options.Client || Client2 || requireLib().Client;
      this.Promise = this.options.Promise || commonjsGlobal.Promise;
      if (typeof this.options.idleTimeoutMillis === "undefined") {
        this.options.idleTimeoutMillis = 1e4;
      }
      this._clients = [];
      this._idle = [];
      this._expired = /* @__PURE__ */ new WeakSet();
      this._pendingQueue = [];
      this._endCallback = void 0;
      this.ending = false;
      this.ended = false;
    }
    _promiseTry(f) {
      const Promise2 = this.Promise;
      if (typeof Promise2.try === "function") {
        return Promise2.try(f);
      }
      return new Promise2((resolve) => resolve(f()));
    }
    _isFull() {
      return this._clients.length >= this.options.max;
    }
    _isAboveMin() {
      return this._clients.length > this.options.min;
    }
    _pulseQueue() {
      this.log("pulse queue");
      if (this.ended) {
        this.log("pulse queue ended");
        return;
      }
      if (this.ending) {
        this.log("pulse queue on ending");
        if (this._idle.length) {
          this._idle.slice().map((item) => {
            this._remove(item.client);
          });
        }
        if (!this._clients.length) {
          this.ended = true;
          this._endCallback();
        }
        return;
      }
      if (!this._pendingQueue.length) {
        this.log("no queued requests");
        return;
      }
      if (!this._idle.length && this._isFull()) {
        return;
      }
      const pendingItem = this._pendingQueue.shift();
      if (this._idle.length) {
        const idleItem = this._idle.pop();
        clearTimeout(idleItem.timeoutId);
        const client2 = idleItem.client;
        client2.ref && client2.ref();
        const idleListener = idleItem.idleListener;
        return this._acquireClient(client2, pendingItem, idleListener, false);
      }
      if (!this._isFull()) {
        return this.newClient(pendingItem);
      }
      throw new Error("unexpected condition");
    }
    _remove(client2, callback) {
      const removed = removeWhere(this._idle, (item) => item.client === client2);
      if (removed !== void 0) {
        clearTimeout(removed.timeoutId);
      }
      this._clients = this._clients.filter((c) => c !== client2);
      const context = this;
      client2.end(() => {
        context.emit("remove", client2);
        if (typeof callback === "function") {
          callback();
        }
      });
    }
    connect(cb) {
      if (this.ending) {
        const err = new Error("Cannot use a pool after calling end on the pool");
        return cb ? cb(err) : this.Promise.reject(err);
      }
      const response = promisify(this.Promise, cb);
      const result2 = response.result;
      if (this._isFull() || this._idle.length) {
        if (this._idle.length) {
          process.nextTick(() => this._pulseQueue());
        }
        if (!this.options.connectionTimeoutMillis) {
          this._pendingQueue.push(new PendingItem(response.callback));
          return result2;
        }
        const queueCallback = (err, res, done) => {
          clearTimeout(tid);
          response.callback(err, res, done);
        };
        const pendingItem = new PendingItem(queueCallback);
        const tid = setTimeout(() => {
          removeWhere(this._pendingQueue, (i) => i.callback === queueCallback);
          pendingItem.timedOut = true;
          response.callback(new Error("timeout exceeded when trying to connect"));
        }, this.options.connectionTimeoutMillis);
        if (tid.unref) {
          tid.unref();
        }
        this._pendingQueue.push(pendingItem);
        return result2;
      }
      this.newClient(new PendingItem(response.callback));
      return result2;
    }
    newClient(pendingItem) {
      const client2 = new this.Client(this.options);
      this._clients.push(client2);
      const idleListener = makeIdleListener(this, client2);
      this.log("checking client timeout");
      let tid;
      let timeoutHit = false;
      if (this.options.connectionTimeoutMillis) {
        tid = setTimeout(() => {
          if (client2.connection) {
            this.log("ending client due to timeout");
            timeoutHit = true;
            client2.connection.stream.destroy();
          } else if (!client2.isConnected()) {
            this.log("ending client due to timeout");
            timeoutHit = true;
            client2.end();
          }
        }, this.options.connectionTimeoutMillis);
      }
      this.log("connecting new client");
      client2.connect((err) => {
        if (tid) {
          clearTimeout(tid);
        }
        client2.on("error", idleListener);
        if (err) {
          this.log("client failed to connect", err);
          this._clients = this._clients.filter((c) => c !== client2);
          if (timeoutHit) {
            err = new Error("Connection terminated due to connection timeout", { cause: err });
          }
          this._pulseQueue();
          if (!pendingItem.timedOut) {
            pendingItem.callback(err, void 0, NOOP);
          }
        } else {
          this.log("new client connected");
          if (this.options.onConnect) {
            this._promiseTry(() => this.options.onConnect(client2)).then(
              () => {
                this._afterConnect(client2, pendingItem, idleListener);
              },
              (hookErr) => {
                this._clients = this._clients.filter((c) => c !== client2);
                client2.end(() => {
                  this._pulseQueue();
                  if (!pendingItem.timedOut) {
                    pendingItem.callback(hookErr, void 0, NOOP);
                  }
                });
              }
            );
            return;
          }
          return this._afterConnect(client2, pendingItem, idleListener);
        }
      });
    }
    _afterConnect(client2, pendingItem, idleListener) {
      if (this.options.maxLifetimeSeconds !== 0) {
        const maxLifetimeTimeout = setTimeout(() => {
          this.log("ending client due to expired lifetime");
          this._expired.add(client2);
          const idleIndex = this._idle.findIndex((idleItem) => idleItem.client === client2);
          if (idleIndex !== -1) {
            this._acquireClient(
              client2,
              new PendingItem((err, client3, clientRelease) => clientRelease()),
              idleListener,
              false
            );
          }
        }, this.options.maxLifetimeSeconds * 1e3);
        maxLifetimeTimeout.unref();
        client2.once("end", () => clearTimeout(maxLifetimeTimeout));
      }
      return this._acquireClient(client2, pendingItem, idleListener, true);
    }
    // acquire a client for a pending work item
    _acquireClient(client2, pendingItem, idleListener, isNew) {
      if (isNew) {
        this.emit("connect", client2);
      }
      this.emit("acquire", client2);
      client2.release = this._releaseOnce(client2, idleListener);
      client2.removeListener("error", idleListener);
      if (!pendingItem.timedOut) {
        if (isNew && this.options.verify) {
          this.options.verify(client2, (err) => {
            if (err) {
              client2.release(err);
              return pendingItem.callback(err, void 0, NOOP);
            }
            pendingItem.callback(void 0, client2, client2.release);
          });
        } else {
          pendingItem.callback(void 0, client2, client2.release);
        }
      } else {
        if (isNew && this.options.verify) {
          this.options.verify(client2, client2.release);
        } else {
          client2.release();
        }
      }
    }
    // returns a function that wraps _release and throws if called more than once
    _releaseOnce(client2, idleListener) {
      let released = false;
      return (err) => {
        if (released) {
          throwOnDoubleRelease();
        }
        released = true;
        this._release(client2, idleListener, err);
      };
    }
    // release a client back to the poll, include an error
    // to remove it from the pool
    _release(client2, idleListener, err) {
      client2.on("error", idleListener);
      client2._poolUseCount = (client2._poolUseCount || 0) + 1;
      this.emit("release", err, client2);
      if (err || this.ending || !client2._queryable || client2._ending || client2._poolUseCount >= this.options.maxUses) {
        if (client2._poolUseCount >= this.options.maxUses) {
          this.log("remove expended client");
        }
        return this._remove(client2, this._pulseQueue.bind(this));
      }
      const isExpired = this._expired.has(client2);
      if (isExpired) {
        this.log("remove expired client");
        this._expired.delete(client2);
        return this._remove(client2, this._pulseQueue.bind(this));
      }
      let tid;
      if (this.options.idleTimeoutMillis && this._isAboveMin()) {
        tid = setTimeout(() => {
          if (this._isAboveMin()) {
            this.log("remove idle client");
            this._remove(client2, this._pulseQueue.bind(this));
          }
        }, this.options.idleTimeoutMillis);
        if (this.options.allowExitOnIdle) {
          tid.unref();
        }
      }
      if (this.options.allowExitOnIdle) {
        client2.unref();
      }
      this._idle.push(new IdleItem(client2, idleListener, tid));
      this._pulseQueue();
    }
    query(text2, values, cb) {
      if (typeof text2 === "function") {
        const response2 = promisify(this.Promise, text2);
        setImmediate(function() {
          return response2.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
        });
        return response2.result;
      }
      if (typeof values === "function") {
        cb = values;
        values = void 0;
      }
      const response = promisify(this.Promise, cb);
      cb = response.callback;
      this.connect((err, client2) => {
        if (err) {
          return cb(err);
        }
        let clientReleased = false;
        const onError = (err2) => {
          if (clientReleased) {
            return;
          }
          clientReleased = true;
          client2.release(err2);
          cb(err2);
        };
        client2.once("error", onError);
        this.log("dispatching query");
        try {
          client2.query(text2, values, (err2, res) => {
            this.log("query dispatched");
            client2.removeListener("error", onError);
            if (clientReleased) {
              return;
            }
            clientReleased = true;
            client2.release(err2);
            if (err2) {
              return cb(err2);
            }
            return cb(void 0, res);
          });
        } catch (err2) {
          client2.release(err2);
          return cb(err2);
        }
      });
      return response.result;
    }
    end(cb) {
      this.log("ending");
      if (this.ending) {
        const err = new Error("Called end on pool more than once");
        return cb ? cb(err) : this.Promise.reject(err);
      }
      this.ending = true;
      const promised = promisify(this.Promise, cb);
      this._endCallback = promised.callback;
      this._pulseQueue();
      return promised.result;
    }
    get waitingCount() {
      return this._pendingQueue.length;
    }
    get idleCount() {
      return this._idle.length;
    }
    get expiredCount() {
      return this._clients.reduce((acc, client2) => acc + (this._expired.has(client2) ? 1 : 0), 0);
    }
    get totalCount() {
      return this._clients.length;
    }
  }
  pgPool = Pool2;
  return pgPool;
}
var client = { exports: {} };
const __viteOptionalPeerDep_pgNative_pg = {};
const __viteOptionalPeerDep_pgNative_pg$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteOptionalPeerDep_pgNative_pg
}, Symbol.toStringTag, { value: "Module" }));
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(__viteOptionalPeerDep_pgNative_pg$1);
var query = { exports: {} };
var hasRequiredQuery;
function requireQuery() {
  if (hasRequiredQuery) return query.exports;
  hasRequiredQuery = 1;
  const EventEmitter2 = require$$0$3.EventEmitter;
  const util2 = require$$1$1;
  const utils2 = utils$3;
  const NativeQuery = query.exports = function(config2, values, callback) {
    EventEmitter2.call(this);
    config2 = utils2.normalizeQueryConfig(config2, values, callback);
    this.text = config2.text;
    this.values = config2.values;
    this.name = config2.name;
    this.queryMode = config2.queryMode;
    this.callback = config2.callback;
    this.state = "new";
    this._arrayMode = config2.rowMode === "array";
    this._emitRowEvents = false;
    this.on(
      "newListener",
      function(event) {
        if (event === "row") this._emitRowEvents = true;
      }.bind(this)
    );
  };
  util2.inherits(NativeQuery, EventEmitter2);
  const errorFieldMap = {
    sqlState: "code",
    statementPosition: "position",
    messagePrimary: "message",
    context: "where",
    schemaName: "schema",
    tableName: "table",
    columnName: "column",
    dataTypeName: "dataType",
    constraintName: "constraint",
    sourceFile: "file",
    sourceLine: "line",
    sourceFunction: "routine"
  };
  NativeQuery.prototype.handleError = function(err) {
    const fields = this.native.pq.resultErrorFields();
    if (fields) {
      for (const key in fields) {
        const normalizedFieldName = errorFieldMap[key] || key;
        err[normalizedFieldName] = fields[key];
      }
    }
    if (this.callback) {
      this.callback(err);
    } else {
      this.emit("error", err);
    }
    this.state = "error";
  };
  NativeQuery.prototype.then = function(onSuccess, onFailure) {
    return this._getPromise().then(onSuccess, onFailure);
  };
  NativeQuery.prototype.catch = function(callback) {
    return this._getPromise().catch(callback);
  };
  NativeQuery.prototype._getPromise = function() {
    if (this._promise) return this._promise;
    this._promise = new Promise(
      function(resolve, reject) {
        this._once("end", resolve);
        this._once("error", reject);
      }.bind(this)
    );
    return this._promise;
  };
  NativeQuery.prototype.submit = function(client2) {
    this.state = "running";
    const self2 = this;
    this.native = client2.native;
    client2.native.arrayMode = this._arrayMode;
    let after = function(err, rows, results) {
      client2.native.arrayMode = false;
      setImmediate(function() {
        self2.emit("_done");
      });
      if (err) {
        return self2.handleError(err);
      }
      if (self2._emitRowEvents) {
        if (results.length > 1) {
          rows.forEach((rowOfRows, i) => {
            rowOfRows.forEach((row) => {
              self2.emit("row", row, results[i]);
            });
          });
        } else {
          rows.forEach(function(row) {
            self2.emit("row", row, results);
          });
        }
      }
      self2.state = "end";
      self2.emit("end", results);
      if (self2.callback) {
        self2.callback(null, results);
      }
    };
    if (process.domain) {
      after = process.domain.bind(after);
    }
    if (this.name) {
      if (this.name.length > 63) {
        console.error("Warning! Postgres only supports 63 characters for query names.");
        console.error("You supplied %s (%s)", this.name, this.name.length);
        console.error("This can cause conflicts and silent errors executing queries");
      }
      const values = (this.values || []).map(utils2.prepareValue);
      if (client2.namedQueries[this.name]) {
        if (this.text && client2.namedQueries[this.name] !== this.text) {
          const err = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          return after(err);
        }
        return client2.native.execute(this.name, values, after);
      }
      return client2.native.prepare(this.name, this.text, values.length, function(err) {
        if (err) return after(err);
        client2.namedQueries[self2.name] = self2.text;
        return self2.native.execute(self2.name, values, after);
      });
    } else if (this.values) {
      if (!Array.isArray(this.values)) {
        const err = new Error("Query values must be an array");
        return after(err);
      }
      const vals = this.values.map(utils2.prepareValue);
      client2.native.query(this.text, vals, after);
    } else if (this.queryMode === "extended") {
      client2.native.query(this.text, [], after);
    } else {
      client2.native.query(this.text, after);
    }
  };
  return query.exports;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client.exports;
  hasRequiredClient = 1;
  const nodeUtils2 = require$$1$1;
  var Native;
  try {
    Native = require$$1;
  } catch (e) {
    throw e;
  }
  const TypeOverrides2 = typeOverrides;
  const EventEmitter2 = require$$0$3.EventEmitter;
  const util2 = require$$1$1;
  const ConnectionParameters3 = connectionParameters;
  const NativeQuery = requireQuery();
  const queryQueueLengthDeprecationNotice2 = nodeUtils2.deprecate(
    () => {
    },
    "Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead."
  );
  const Client2 = client.exports = function(config2) {
    EventEmitter2.call(this);
    config2 = config2 || {};
    this._Promise = config2.Promise || commonjsGlobal.Promise;
    this._types = new TypeOverrides2(config2.types);
    this.native = new Native({
      types: this._types
    });
    this._queryQueue = [];
    this._ending = false;
    this._connecting = false;
    this._connected = false;
    this._queryable = true;
    const cp = this.connectionParameters = new ConnectionParameters3(config2);
    if (config2.nativeConnectionString) cp.nativeConnectionString = config2.nativeConnectionString;
    this.user = cp.user;
    Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: cp.password
    });
    this.database = cp.database;
    this.host = cp.host;
    this.port = cp.port;
    this.namedQueries = {};
  };
  Client2.Query = NativeQuery;
  util2.inherits(Client2, EventEmitter2);
  Client2.prototype._errorAllQueries = function(err) {
    const enqueueError = (query2) => {
      process.nextTick(() => {
        query2.native = this.native;
        query2.handleError(err);
      });
    };
    if (this._hasActiveQuery()) {
      enqueueError(this._activeQuery);
      this._activeQuery = null;
    }
    this._queryQueue.forEach(enqueueError);
    this._queryQueue.length = 0;
  };
  Client2.prototype._connect = function(cb) {
    const self2 = this;
    if (this._connecting) {
      process.nextTick(() => cb(new Error("Client has already been connected. You cannot reuse a client.")));
      return;
    }
    this._connecting = true;
    this.connectionParameters.getLibpqConnectionString(function(err, conString) {
      if (self2.connectionParameters.nativeConnectionString) conString = self2.connectionParameters.nativeConnectionString;
      if (err) return cb(err);
      self2.native.connect(conString, function(err2) {
        if (err2) {
          self2.native.end();
          return cb(err2);
        }
        self2._connected = true;
        self2.native.on("error", function(err3) {
          self2._queryable = false;
          self2._errorAllQueries(err3);
          self2.emit("error", err3);
        });
        self2.native.on("notification", function(msg) {
          self2.emit("notification", {
            channel: msg.relname,
            payload: msg.extra
          });
        });
        self2.emit("connect");
        self2._pulseQueryQueue(true);
        cb(null, this);
      });
    });
  };
  Client2.prototype.connect = function(callback) {
    if (callback) {
      this._connect(callback);
      return;
    }
    return new this._Promise((resolve, reject) => {
      this._connect((error2) => {
        if (error2) {
          reject(error2);
        } else {
          resolve(this);
        }
      });
    });
  };
  Client2.prototype.query = function(config2, values, callback) {
    let query2;
    let result2;
    let readTimeout;
    let readTimeoutTimer;
    let queryCallback;
    if (config2 === null || config2 === void 0) {
      throw new TypeError("Client was passed a null or undefined query");
    } else if (typeof config2.submit === "function") {
      readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
      result2 = query2 = config2;
      if (typeof values === "function") {
        config2.callback = values;
      }
    } else {
      readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
      query2 = new NativeQuery(config2, values, callback);
      if (!query2.callback) {
        let resolveOut, rejectOut;
        result2 = new this._Promise((resolve, reject) => {
          resolveOut = resolve;
          rejectOut = reject;
        }).catch((err) => {
          Error.captureStackTrace(err);
          throw err;
        });
        query2.callback = (err, res) => err ? rejectOut(err) : resolveOut(res);
      }
    }
    if (readTimeout) {
      queryCallback = query2.callback || (() => {
      });
      readTimeoutTimer = setTimeout(() => {
        const error2 = new Error("Query read timeout");
        process.nextTick(() => {
          query2.handleError(error2, this.connection);
        });
        queryCallback(error2);
        query2.callback = () => {
        };
        const index2 = this._queryQueue.indexOf(query2);
        if (index2 > -1) {
          this._queryQueue.splice(index2, 1);
        }
        this._pulseQueryQueue();
      }, readTimeout);
      query2.callback = (err, res) => {
        clearTimeout(readTimeoutTimer);
        queryCallback(err, res);
      };
    }
    if (!this._queryable) {
      query2.native = this.native;
      process.nextTick(() => {
        query2.handleError(new Error("Client has encountered a connection error and is not queryable"));
      });
      return result2;
    }
    if (this._ending) {
      query2.native = this.native;
      process.nextTick(() => {
        query2.handleError(new Error("Client was closed and is not queryable"));
      });
      return result2;
    }
    if (this._queryQueue.length > 0) {
      queryQueueLengthDeprecationNotice2();
    }
    this._queryQueue.push(query2);
    this._pulseQueryQueue();
    return result2;
  };
  Client2.prototype.end = function(cb) {
    const self2 = this;
    this._ending = true;
    if (!this._connected) {
      this.once("connect", this.end.bind(this, cb));
    }
    let result2;
    if (!cb) {
      result2 = new this._Promise(function(resolve, reject) {
        cb = (err) => err ? reject(err) : resolve();
      });
    }
    this.native.end(function() {
      self2._connected = false;
      self2._errorAllQueries(new Error("Connection terminated"));
      process.nextTick(() => {
        self2.emit("end");
        if (cb) cb();
      });
    });
    return result2;
  };
  Client2.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
  };
  Client2.prototype._pulseQueryQueue = function(initialConnection) {
    if (!this._connected) {
      return;
    }
    if (this._hasActiveQuery()) {
      return;
    }
    const query2 = this._queryQueue.shift();
    if (!query2) {
      if (!initialConnection) {
        this.emit("drain");
      }
      return;
    }
    this._activeQuery = query2;
    query2.submit(this);
    const self2 = this;
    query2.once("_done", function() {
      self2._pulseQueryQueue();
    });
  };
  Client2.prototype.cancel = function(query2) {
    if (this._activeQuery === query2) {
      this.native.cancel(function() {
      });
    } else if (this._queryQueue.indexOf(query2) !== -1) {
      this._queryQueue.splice(this._queryQueue.indexOf(query2), 1);
    }
  };
  Client2.prototype.ref = function() {
  };
  Client2.prototype.unref = function() {
  };
  Client2.prototype.setTypeParser = function(oid, format, parseFn) {
    return this._types.setTypeParser(oid, format, parseFn);
  };
  Client2.prototype.getTypeParser = function(oid, format) {
    return this._types.getTypeParser(oid, format);
  };
  Client2.prototype.isConnected = function() {
    return this._connected;
  };
  return client.exports;
}
var native;
var hasRequiredNative;
function requireNative() {
  if (hasRequiredNative) return native;
  hasRequiredNative = 1;
  native = requireClient();
  return native;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib$1.exports;
  hasRequiredLib = 1;
  (function(module) {
    const Client2 = client$1;
    const defaults2 = defaultsExports;
    const Connection3 = connection;
    const Result3 = result;
    const utils2 = utils$3;
    const Pool2 = requirePgPool();
    const TypeOverrides2 = typeOverrides;
    const { DatabaseError: DatabaseError2 } = dist;
    const { escapeIdentifier: escapeIdentifier2, escapeLiteral: escapeLiteral2 } = utils$3;
    const poolFactory = (Client3) => {
      return class BoundPool extends Pool2 {
        constructor(options) {
          super(options, Client3);
        }
      };
    };
    const PG = function(clientConstructor2) {
      this.defaults = defaults2;
      this.Client = clientConstructor2;
      this.Query = this.Client.Query;
      this.Pool = poolFactory(this.Client);
      this._pools = [];
      this.Connection = Connection3;
      this.types = pgTypes;
      this.DatabaseError = DatabaseError2;
      this.TypeOverrides = TypeOverrides2;
      this.escapeIdentifier = escapeIdentifier2;
      this.escapeLiteral = escapeLiteral2;
      this.Result = Result3;
      this.utils = utils2;
    };
    let clientConstructor = Client2;
    let forceNative = false;
    try {
      forceNative = !!process.env.NODE_PG_FORCE_NATIVE;
    } catch {
    }
    if (forceNative) {
      clientConstructor = requireNative();
    }
    module.exports = new PG(clientConstructor);
    Object.defineProperty(module.exports, "native", {
      configurable: true,
      enumerable: false,
      get() {
        let native2 = null;
        try {
          native2 = new PG(requireNative());
        } catch (err) {
          if (err.code !== "MODULE_NOT_FOUND") {
            throw err;
          }
        }
        Object.defineProperty(module.exports, "native", {
          value: native2
        });
        return native2;
      }
    });
  })(lib$1);
  return lib$1.exports;
}
var libExports = requireLib();
const pg = /* @__PURE__ */ getDefaultExportFromCjs(libExports);
pg.Client;
pg.Pool;
pg.Connection;
pg.types;
pg.Query;
pg.DatabaseError;
pg.escapeIdentifier;
pg.escapeLiteral;
pg.Result;
pg.TypeOverrides;
pg.defaults;
const NEVER = Object.freeze({
  status: "aborted"
});
function $constructor(name, initializer2, params) {
  function init2(inst, def) {
    var _a;
    Object.defineProperty(inst, "_zod", {
      value: inst._zod ?? {},
      enumerable: false
    });
    (_a = inst._zod).traits ?? (_a.traits = /* @__PURE__ */ new Set());
    inst._zod.traits.add(name);
    initializer2(inst, def);
    for (const k in _.prototype) {
      if (!(k in inst))
        Object.defineProperty(inst, k, { value: _.prototype[k].bind(inst) });
    }
    inst._zod.constr = _;
    inst._zod.def = def;
  }
  const Parent = params?.Parent ?? Object;
  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    var _a;
    const inst = params?.Parent ? new Definition() : this;
    init2(inst, def);
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  Object.defineProperty(_, "init", { value: init2 });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
const $brand = /* @__PURE__ */ Symbol("zod_brand");
class $ZodAsyncError extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
}
const globalConfig = {};
function config(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}
function assertEqual(val2) {
  return val2;
}
function assertNotEqual(val2) {
  return val2;
}
function assertIs(_arg) {
}
function assertNever(_x) {
  throw new Error();
}
function assert(_) {
}
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function joinValues(array2, separator = "|") {
  return array2.map((val2) => stringifyPrimitive(val2)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}
function cached(getter) {
  return {
    get value() {
      {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
    }
  };
}
function nullish$1(input) {
  return input === null || input === void 0;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder(val2, step) {
  const valDecCount = (val2.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val2.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
function defineLazy(object2, key, getter) {
  Object.defineProperty(object2, key, {
    get() {
      {
        const value = getter();
        object2[key] = value;
        return value;
      }
    },
    set(v) {
      Object.defineProperty(object2, key, {
        value: v
        // configurable: true,
      });
    },
    configurable: true
  });
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function getElementAtPath(obj, path) {
  if (!path)
    return obj;
  return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
  const keys = Object.keys(promisesObj);
  const promises = keys.map((key) => promisesObj[key]);
  return Promise.all(promises).then((results) => {
    const resolvedObj = {};
    for (let i = 0; i < keys.length; i++) {
      resolvedObj[keys[i]] = results[i];
    }
    return resolvedObj;
  });
}
function randomString(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
function esc(str) {
  return JSON.stringify(str);
}
const captureStackTrace = Error.captureStackTrace ? Error.captureStackTrace : (..._args) => {
};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
const allowsEval = cached(() => {
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === void 0)
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function numKeys(data) {
  let keyCount = 0;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      keyCount++;
    }
  }
  return keyCount;
}
const getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(data) ? "nan" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    case "object":
      if (Array.isArray(data)) {
        return "array";
      }
      if (data === null) {
        return "null";
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return "promise";
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return "map";
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return "set";
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return "date";
      }
      if (typeof File !== "undefined" && data instanceof File) {
        return "file";
      }
      return "object";
    default:
      throw new Error(`Unknown data type: ${t}`);
  }
};
const propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
const primitiveTypes = /* @__PURE__ */ new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== void 0) {
    if (params?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function createTransparentProxy(getter) {
  let target;
  return new Proxy({}, {
    get(_, prop, receiver) {
      target ?? (target = getter());
      return Reflect.get(target, prop, receiver);
    },
    set(_, prop, value, receiver) {
      target ?? (target = getter());
      return Reflect.set(target, prop, value, receiver);
    },
    has(_, prop) {
      target ?? (target = getter());
      return Reflect.has(target, prop);
    },
    deleteProperty(_, prop) {
      target ?? (target = getter());
      return Reflect.deleteProperty(target, prop);
    },
    ownKeys(_) {
      target ?? (target = getter());
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(_, prop) {
      target ?? (target = getter());
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    defineProperty(_, prop, descriptor) {
      target ?? (target = getter());
      return Reflect.defineProperty(target, prop, descriptor);
    }
  });
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint")
    return value.toString() + "n";
  if (typeof value === "string")
    return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
const NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
const BIGINT_FORMAT_RANGES = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema2, mask) {
  const newShape = {};
  const currDef = schema2._zod.def;
  for (const key in mask) {
    if (!(key in currDef.shape)) {
      throw new Error(`Unrecognized key: "${key}"`);
    }
    if (!mask[key])
      continue;
    newShape[key] = currDef.shape[key];
  }
  return clone(schema2, {
    ...schema2._zod.def,
    shape: newShape,
    checks: []
  });
}
function omit(schema2, mask) {
  const newShape = { ...schema2._zod.def.shape };
  const currDef = schema2._zod.def;
  for (const key in mask) {
    if (!(key in currDef.shape)) {
      throw new Error(`Unrecognized key: "${key}"`);
    }
    if (!mask[key])
      continue;
    delete newShape[key];
  }
  return clone(schema2, {
    ...schema2._zod.def,
    shape: newShape,
    checks: []
  });
}
function extend(schema2, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const def = {
    ...schema2._zod.def,
    get shape() {
      const _shape = { ...schema2._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    checks: []
    // delete existing checks
  };
  return clone(schema2, def);
}
function merge(a, b) {
  return clone(a, {
    ...a._zod.def,
    get shape() {
      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    catchall: b._zod.def.catchall,
    checks: []
    // delete existing checks
  });
}
function partial(Class2, schema2, mask) {
  const oldShape = schema2._zod.def.shape;
  const shape = { ...oldShape };
  if (mask) {
    for (const key in mask) {
      if (!(key in oldShape)) {
        throw new Error(`Unrecognized key: "${key}"`);
      }
      if (!mask[key])
        continue;
      shape[key] = Class2 ? new Class2({
        type: "optional",
        innerType: oldShape[key]
      }) : oldShape[key];
    }
  } else {
    for (const key in oldShape) {
      shape[key] = Class2 ? new Class2({
        type: "optional",
        innerType: oldShape[key]
      }) : oldShape[key];
    }
  }
  return clone(schema2, {
    ...schema2._zod.def,
    shape,
    checks: []
  });
}
function required(Class2, schema2, mask) {
  const oldShape = schema2._zod.def.shape;
  const shape = { ...oldShape };
  if (mask) {
    for (const key in mask) {
      if (!(key in shape)) {
        throw new Error(`Unrecognized key: "${key}"`);
      }
      if (!mask[key])
        continue;
      shape[key] = new Class2({
        type: "nonoptional",
        innerType: oldShape[key]
      });
    }
  } else {
    for (const key in oldShape) {
      shape[key] = new Class2({
        type: "nonoptional",
        innerType: oldShape[key]
      });
    }
  }
  return clone(schema2, {
    ...schema2._zod.def,
    shape,
    // optional: [],
    checks: []
  });
}
function aborted(x, startIndex = 0) {
  for (let i = startIndex; i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true)
      return true;
  }
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a;
    (_a = iss).path ?? (_a.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config2) {
  const full = { ...iss, path: iss.path ?? [] };
  if (!iss.message) {
    const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
    full.message = message;
  }
  delete full.inst;
  delete full.continue;
  if (!ctx?.reportInput) {
    delete full.input;
  }
  return full;
}
function getSizableOrigin(input) {
  if (input instanceof Set)
    return "set";
  if (input instanceof Map)
    return "map";
  if (input instanceof File)
    return "file";
  return "unknown";
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
function cleanEnum(obj) {
  return Object.entries(obj).filter(([k, _]) => {
    return Number.isNaN(Number.parseInt(k, 10));
  }).map((el) => el[1]);
}
class Class {
  constructor(..._args) {
  }
}
const util = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BIGINT_FORMAT_RANGES,
  Class,
  NUMBER_FORMAT_RANGES,
  aborted,
  allowsEval,
  assert,
  assertEqual,
  assertIs,
  assertNever,
  assertNotEqual,
  assignProp,
  cached,
  captureStackTrace,
  cleanEnum,
  cleanRegex,
  clone,
  createTransparentProxy,
  defineLazy,
  esc,
  escapeRegex,
  extend,
  finalizeIssue,
  floatSafeRemainder,
  getElementAtPath,
  getEnumValues,
  getLengthableOrigin,
  getParsedType,
  getSizableOrigin,
  isObject,
  isPlainObject,
  issue,
  joinValues,
  jsonStringifyReplacer,
  merge,
  normalizeParams,
  nullish: nullish$1,
  numKeys,
  omit,
  optionalKeys,
  partial,
  pick,
  prefixIssues,
  primitiveTypes,
  promiseAllObject,
  propertyKeyTypes,
  randomString,
  required,
  stringifyPrimitive,
  unwrapMessage
}, Symbol.toStringTag, { value: "Module" }));
const initializer$1 = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false
  });
  Object.defineProperty(inst, "message", {
    get() {
      return JSON.stringify(def, jsonStringifyReplacer, 2);
    },
    enumerable: true
    // configurable: false,
  });
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false
  });
};
const $ZodError = $constructor("$ZodError", initializer$1);
const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
function flattenError(error2, mapper = (issue2) => issue2.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error2.issues) {
    if (sub.path.length > 0) {
      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
      fieldErrors[sub.path[0]].push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error2, _mapper) {
  const mapper = _mapper || function(issue2) {
    return issue2.message;
  };
  const fieldErrors = { _errors: [] };
  const processError = (error3) => {
    for (const issue2 of error3.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues });
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues });
      } else if (issue2.path.length === 0) {
        fieldErrors._errors.push(mapper(issue2));
      } else {
        let curr = fieldErrors;
        let i = 0;
        while (i < issue2.path.length) {
          const el = issue2.path[i];
          const terminal = i === issue2.path.length - 1;
          if (!terminal) {
            curr[el] = curr[el] || { _errors: [] };
          } else {
            curr[el] = curr[el] || { _errors: [] };
            curr[el]._errors.push(mapper(issue2));
          }
          curr = curr[el];
          i++;
        }
      }
    }
  };
  processError(error2);
  return fieldErrors;
}
function treeifyError(error2, _mapper) {
  const mapper = _mapper || function(issue2) {
    return issue2.message;
  };
  const result2 = { errors: [] };
  const processError = (error3, path = []) => {
    var _a, _b;
    for (const issue2 of error3.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }, issue2.path));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues }, issue2.path);
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues }, issue2.path);
      } else {
        const fullpath = [...path, ...issue2.path];
        if (fullpath.length === 0) {
          result2.errors.push(mapper(issue2));
          continue;
        }
        let curr = result2;
        let i = 0;
        while (i < fullpath.length) {
          const el = fullpath[i];
          const terminal = i === fullpath.length - 1;
          if (typeof el === "string") {
            curr.properties ?? (curr.properties = {});
            (_a = curr.properties)[el] ?? (_a[el] = { errors: [] });
            curr = curr.properties[el];
          } else {
            curr.items ?? (curr.items = []);
            (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
            curr = curr.items[el];
          }
          if (terminal) {
            curr.errors.push(mapper(issue2));
          }
          i++;
        }
      }
    }
  };
  processError(error2);
  return result2;
}
function toDotPath(path) {
  const segs = [];
  for (const seg of path) {
    if (typeof seg === "number")
      segs.push(`[${seg}]`);
    else if (typeof seg === "symbol")
      segs.push(`[${JSON.stringify(String(seg))}]`);
    else if (/[^\w$]/.test(seg))
      segs.push(`[${JSON.stringify(seg)}]`);
    else {
      if (segs.length)
        segs.push(".");
      segs.push(seg);
    }
  }
  return segs.join("");
}
function prettifyError(error2) {
  const lines = [];
  const issues = [...error2.issues].sort((a, b) => a.path.length - b.path.length);
  for (const issue2 of issues) {
    lines.push(`✖ ${issue2.message}`);
    if (issue2.path?.length)
      lines.push(`  → at ${toDotPath(issue2.path)}`);
  }
  return lines.join("\n");
}
const _parse = (_Err) => (schema2, value, _ctx, _params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
  const result2 = schema2._zod.run({ value, issues: [] }, ctx);
  if (result2 instanceof Promise) {
    throw new $ZodAsyncError();
  }
  if (result2.issues.length) {
    const e = new (_params?.Err ?? _Err)(result2.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result2.value;
};
const parse$1 = /* @__PURE__ */ _parse($ZodRealError);
const _parseAsync = (_Err) => async (schema2, value, _ctx, params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result2 = schema2._zod.run({ value, issues: [] }, ctx);
  if (result2 instanceof Promise)
    result2 = await result2;
  if (result2.issues.length) {
    const e = new (params?.Err ?? _Err)(result2.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result2.value;
};
const parseAsync$1 = /* @__PURE__ */ _parseAsync($ZodRealError);
const _safeParse = (_Err) => (schema2, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result2 = schema2._zod.run({ value, issues: [] }, ctx);
  if (result2 instanceof Promise) {
    throw new $ZodAsyncError();
  }
  return result2.issues.length ? {
    success: false,
    error: new (_Err ?? $ZodError)(result2.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result2.value };
};
const safeParse$1 = /* @__PURE__ */ _safeParse($ZodRealError);
const _safeParseAsync = (_Err) => async (schema2, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result2 = schema2._zod.run({ value, issues: [] }, ctx);
  if (result2 instanceof Promise)
    result2 = await result2;
  return result2.issues.length ? {
    success: false,
    error: new _Err(result2.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result2.value };
};
const safeParseAsync$1 = /* @__PURE__ */ _safeParseAsync($ZodRealError);
const cuid$1 = /^[cC][^\s-]{8,}$/;
const cuid2$1 = /^[0-9a-z]+$/;
const ulid$1 = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
const xid$1 = /^[0-9a-vA-V]{20}$/;
const ksuid$1 = /^[A-Za-z0-9]{27}$/;
const nanoid$1 = /^[a-zA-Z0-9_-]{21}$/;
const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
const extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
const guid$1 = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
const uuid$1 = (version2) => {
  if (!version2)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
const uuid4 = /* @__PURE__ */ uuid$1(4);
const uuid6 = /* @__PURE__ */ uuid$1(6);
const uuid7 = /* @__PURE__ */ uuid$1(7);
const email$1 = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
const html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
const browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji$1() {
  return new RegExp(_emoji$1, "u");
}
const ipv4$1 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6$1 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/;
const cidrv4$1 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
const cidrv6$1 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64$1 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
const base64url$1 = /^[A-Za-z0-9_-]*$/;
const hostname = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/;
const domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
const e164$1 = /^\+(?:[0-9]){6,14}[0-9]$/;
const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
const date$3 = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time$1(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime$1(args) {
  const time2 = timeSource({ precision: args.precision });
  const opts = ["Z"];
  if (args.local)
    opts.push("");
  if (args.offset)
    opts.push(`([+-]\\d{2}:\\d{2})`);
  const timeRegex = `${time2}(?:${opts.join("|")})`;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
const string$2 = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
const bigint$2 = /^\d+n?$/;
const integer = /^\d+$/;
const number$2 = /^-?\d+(?:\.\d+)?/i;
const boolean$2 = /true|false/i;
const _null$2 = /null/i;
const _undefined$2 = /undefined/i;
const lowercase = /^[^A-Z]*$/;
const uppercase = /^[^a-z]*$/;
const regexes = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _emoji: _emoji$1,
  base64: base64$1,
  base64url: base64url$1,
  bigint: bigint$2,
  boolean: boolean$2,
  browserEmail,
  cidrv4: cidrv4$1,
  cidrv6: cidrv6$1,
  cuid: cuid$1,
  cuid2: cuid2$1,
  date: date$3,
  datetime: datetime$1,
  domain,
  duration: duration$1,
  e164: e164$1,
  email: email$1,
  emoji: emoji$1,
  extendedDuration,
  guid: guid$1,
  hostname,
  html5Email,
  integer,
  ipv4: ipv4$1,
  ipv6: ipv6$1,
  ksuid: ksuid$1,
  lowercase,
  nanoid: nanoid$1,
  null: _null$2,
  number: number$2,
  rfc5322Email,
  string: string$2,
  time: time$1,
  ulid: ulid$1,
  undefined: _undefined$2,
  unicodeEmail,
  uppercase,
  uuid: uuid$1,
  uuid4,
  uuid6,
  uuid7,
  xid: xid$1
}, Symbol.toStringTag, { value: "Module" }));
const $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a = inst._zod).onattach ?? (_a.onattach = []);
});
const numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
const $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (def.value < curr) {
      if (def.inclusive)
        bag.maximum = def.value;
      else
        bag.exclusiveMaximum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (def.value > curr) {
      if (def.inclusive)
        bag.minimum = def.value;
      else
        bag.exclusiveMinimum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    var _a;
    (_a = inst2._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
  });
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
    if (isMultiple)
      return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
    if (isInt)
      bag.pattern = integer;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inst
      });
    }
  };
});
const $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (input < minimum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_big",
        maximum,
        inst
      });
    }
  };
});
const $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val2 = payload.value;
    return !nullish$1(val2) && val2.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size <= def.maximum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_big",
      maximum: def.maximum,
      input,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val2 = payload.value;
    return !nullish$1(val2) && val2.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size >= def.minimum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_small",
      minimum: def.minimum,
      input,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val2 = payload.value;
    return !nullish$1(val2) && val2.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.size;
    bag.maximum = def.size;
    bag.size = def.size;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size === def.size)
      return;
    const tooBig = size > def.size;
    payload.issues.push({
      origin: getSizableOrigin(input),
      ...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val2 = payload.value;
    return !nullish$1(val2) && val2.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length <= def.maximum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val2 = payload.value;
    return !nullish$1(val2) && val2.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length >= def.minimum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val2 = payload.value;
    return !nullish$1(val2) && val2.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.length;
    bag.maximum = def.length;
    bag.length = def.length;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length === def.length)
      return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a, _b;
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    if (def.pattern) {
      bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
      bag.patterns.add(def.pattern);
    }
  });
  if (def.pattern)
    (_a = inst._zod).check ?? (_a.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b = inst._zod).check ?? (_b.check = () => {
    });
});
const $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function handleCheckPropertyResult(result2, payload, property) {
  if (result2.issues.length) {
    payload.issues.push(...prefixIssues(property, result2.issues));
  }
}
const $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    const result2 = def.schema._zod.run({
      value: payload.value[def.property],
      issues: []
    }, {});
    if (result2 instanceof Promise) {
      return result2.then((result3) => handleCheckPropertyResult(result3, payload, def.property));
    }
    handleCheckPropertyResult(result2, payload, def.property);
    return;
  };
});
const $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
  $ZodCheck.init(inst, def);
  const mimeSet = new Set(def.mime);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.mime = def.mime;
  });
  inst._zod.check = (payload) => {
    if (mimeSet.has(payload.value.type))
      return;
    payload.issues.push({
      code: "invalid_value",
      values: def.mime,
      input: payload.value.type,
      inst
    });
  };
});
const $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});
class Doc {
  constructor(args = []) {
    this.content = [];
    this.indent = 0;
    if (this)
      this.args = args;
  }
  indented(fn) {
    this.indent += 1;
    fn(this);
    this.indent -= 1;
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content.split("\n").filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const args = this?.args;
    const content = this?.content ?? [``];
    const lines = [...content.map((x) => `  ${x}`)];
    return new F(...args, lines.join("\n"));
  }
}
const version = {
  major: 4,
  minor: 0,
  patch: 0
};
const $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const checks = [...inst._zod.def.checks ?? []];
  if (inst._zod.traits.has("$ZodCheck")) {
    checks.unshift(inst);
  }
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks2, ctx) => {
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks2) {
        if (ch._zod.def.when) {
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError();
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            if (!isAborted)
              isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          if (!isAborted)
            isAborted = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    inst._zod.run = (payload, ctx) => {
      const result2 = inst._zod.parse(payload, ctx);
      if (result2 instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError();
        return result2.then((result3) => runChecks(result3, checks, ctx));
      }
      return runChecks(result2, checks, ctx);
    };
  }
  inst["~standard"] = {
    validate: (value) => {
      try {
        const r = safeParse$1(inst, value);
        return r.success ? { value: r.data } : { issues: r.error?.issues };
      } catch (_) {
        return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
});
const $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$2(inst._zod.bag);
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_2) {
      }
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
const $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
const $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    };
    const v = versionMap[def.version];
    if (v === void 0)
      throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid$1(v));
  } else
    def.pattern ?? (def.pattern = uuid$1());
  $ZodStringFormat.init(inst, def);
});
const $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const orig = payload.value;
      const url2 = new URL(orig);
      const href = url2.href;
      if (def.hostname) {
        def.hostname.lastIndex = 0;
        if (!def.hostname.test(url2.hostname)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid hostname",
            pattern: hostname.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.protocol) {
        def.protocol.lastIndex = 0;
        if (!def.protocol.test(url2.protocol.endsWith(":") ? url2.protocol.slice(0, -1) : url2.protocol)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid protocol",
            pattern: def.protocol.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (!orig.endsWith("/") && href.endsWith("/")) {
        payload.value = href.slice(0, -1);
      } else {
        payload.value = href;
      }
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
const $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji$1());
  $ZodStringFormat.init(inst, def);
});
const $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  def.pattern ?? (def.pattern = nanoid$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime$1(def));
  $ZodStringFormat.init(inst, def);
});
const $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date$3);
  $ZodStringFormat.init(inst, def);
});
const $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time$1(def));
  $ZodStringFormat.init(inst, def);
});
const $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4$1);
  $ZodStringFormat.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = `ipv4`;
  });
});
const $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6$1);
  $ZodStringFormat.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = `ipv6`;
  });
  inst._zod.check = (payload) => {
    try {
      new URL(`http://[${payload.value}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
const $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4$1);
  $ZodStringFormat.init(inst, def);
});
const $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6$1);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    const [address, prefix] = payload.value.split("/");
    try {
      if (!prefix)
        throw new Error();
      const prefixNum = Number(prefix);
      if (`${prefixNum}` !== prefix)
        throw new Error();
      if (prefixNum < 0 || prefixNum > 128)
        throw new Error();
      new URL(`http://[${address}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
const $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64$1);
  $ZodStringFormat.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.contentEncoding = "base64";
  });
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function isValidBase64URL(data) {
  if (!base64url$1.test(data))
    return false;
  const base642 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base642.padEnd(Math.ceil(base642.length / 4) * 4, "=");
  return isValidBase64(padded);
}
const $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64url$1);
  $ZodStringFormat.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.contentEncoding = "base64url";
  });
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164$1);
  $ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
const $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT(payload.value, def.alg))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (def.fn(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: def.format,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
const $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = inst._zod.bag.pattern ?? number$2;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
const $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
const $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean$2;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
const $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = bigint$2;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = BigInt(payload.value);
      } catch (_) {
      }
    if (typeof payload.value === "bigint")
      return payload;
    payload.issues.push({
      expected: "bigint",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
const $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
  $ZodCheckBigIntFormat.init(inst, def);
  $ZodBigInt.init(inst, def);
});
const $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "symbol")
      return payload;
    payload.issues.push({
      expected: "symbol",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
const $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _undefined$2;
  inst._zod.values = /* @__PURE__ */ new Set([void 0]);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "undefined",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
const $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _null$2;
  inst._zod.values = /* @__PURE__ */ new Set([null]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input === null)
      return payload;
    payload.issues.push({
      expected: "null",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
const $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
const $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
const $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
const $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "void",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
const $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce) {
      try {
        payload.value = new Date(payload.value);
      } catch (_err) {
      }
    }
    const input = payload.value;
    const isDate2 = input instanceof Date;
    const isValidDate = isDate2 && !Number.isNaN(input.getTime());
    if (isValidDate)
      return payload;
    payload.issues.push({
      expected: "date",
      code: "invalid_type",
      input,
      ...isDate2 ? { received: "Invalid Date" } : {},
      inst
    });
    return payload;
  };
});
function handleArrayResult(result2, final, index2) {
  if (result2.issues.length) {
    final.issues.push(...prefixIssues(index2, result2.issues));
  }
  final.value[index2] = result2.value;
}
const $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = Array(input.length);
    const proms = [];
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      const result2 = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result2 instanceof Promise) {
        proms.push(result2.then((result3) => handleArrayResult(result3, payload, i)));
      } else {
        handleArrayResult(result2, payload, i);
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handleObjectResult(result2, final, key) {
  if (result2.issues.length) {
    final.issues.push(...prefixIssues(key, result2.issues));
  }
  final.value[key] = result2.value;
}
function handleOptionalObjectResult(result2, final, key, input) {
  if (result2.issues.length) {
    if (input[key] === void 0) {
      if (key in input) {
        final.value[key] = void 0;
      } else {
        final.value[key] = result2.value;
      }
    } else {
      final.issues.push(...prefixIssues(key, result2.issues));
    }
  } else if (result2.value === void 0) {
    if (key in input)
      final.value[key] = void 0;
  } else {
    final.value[key] = result2.value;
  }
}
const $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const _normalized = cached(() => {
    const keys = Object.keys(def.shape);
    for (const k of keys) {
      if (!(def.shape[k] instanceof $ZodType)) {
        throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
      }
    }
    const okeys = optionalKeys(def.shape);
    return {
      shape: def.shape,
      keys,
      keySet: new Set(keys),
      numKeys: keys.length,
      optionalKeys: new Set(okeys)
    };
  });
  defineLazy(inst._zod, "propValues", () => {
    const shape = def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
        for (const v of field.values)
          propValues[key].add(v);
      }
    }
    return propValues;
  });
  const generateFastpass = (shape) => {
    const doc = new Doc(["shape", "payload", "ctx"]);
    const normalized = _normalized.value;
    const parseStr = (key) => {
      const k = esc(key);
      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    };
    doc.write(`const input = payload.value;`);
    const ids = /* @__PURE__ */ Object.create(null);
    let counter = 0;
    for (const key of normalized.keys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(`const newResult = {}`);
    for (const key of normalized.keys) {
      if (normalized.optionalKeys.has(key)) {
        const id2 = ids[key];
        doc.write(`const ${id2} = ${parseStr(key)};`);
        const k = esc(key);
        doc.write(`
        if (${id2}.issues.length) {
          if (input[${k}] === undefined) {
            if (${k} in input) {
              newResult[${k}] = undefined;
            }
          } else {
            payload.issues = payload.issues.concat(
              ${id2}.issues.map((iss) => ({
                ...iss,
                path: iss.path ? [${k}, ...iss.path] : [${k}],
              }))
            );
          }
        } else if (${id2}.value === undefined) {
          if (${k} in input) newResult[${k}] = undefined;
        } else {
          newResult[${k}] = ${id2}.value;
        }
        `);
      } else {
        const id2 = ids[key];
        doc.write(`const ${id2} = ${parseStr(key)};`);
        doc.write(`
          if (${id2}.issues.length) payload.issues = payload.issues.concat(${id2}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${esc(key)}, ...iss.path] : [${esc(key)}]
          })));`);
        doc.write(`newResult[${esc(key)}] = ${id2}.value`);
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    const fn = doc.compile();
    return (payload, ctx) => fn(shape, payload, ctx);
  };
  let fastpass;
  const isObject$1 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval$1 = allowsEval;
  const fastEnabled = jit && allowsEval$1.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject$1(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass)
        fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
    } else {
      payload.value = {};
      const shape = value.shape;
      for (const key of value.keys) {
        const el = shape[key];
        const r = el._zod.run({ value: input[key], issues: [] }, ctx);
        const isOptional = el._zod.optin === "optional" && el._zod.optout === "optional";
        if (r instanceof Promise) {
          proms.push(r.then((r2) => isOptional ? handleOptionalObjectResult(r2, payload, key, input) : handleObjectResult(r2, payload, key)));
        } else if (isOptional) {
          handleOptionalObjectResult(r, payload, key, input);
        } else {
          handleObjectResult(r, payload, key);
        }
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    const unrecognized = [];
    const keySet = value.keySet;
    const _catchall = catchall._zod;
    const t = _catchall.def.type;
    for (const key of Object.keys(input)) {
      if (keySet.has(key))
        continue;
      if (t === "never") {
        unrecognized.push(key);
        continue;
      }
      const r = _catchall.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r2) => handleObjectResult(r2, payload, key)));
      } else {
        handleObjectResult(r, payload, key);
      }
    }
    if (unrecognized.length) {
      payload.issues.push({
        code: "unrecognized_keys",
        keys: unrecognized,
        input,
        inst
      });
    }
    if (!proms.length)
      return payload;
    return Promise.all(proms).then(() => {
      return payload;
    });
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result2 of results) {
    if (result2.issues.length === 0) {
      final.value = result2.value;
      return final;
    }
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result2) => result2.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
const $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "values", () => {
    if (def.options.every((o) => o._zod.values)) {
      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    if (def.options.every((o) => o._zod.pattern)) {
      const patterns = def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result2 = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result2 instanceof Promise) {
        results.push(result2);
        async = true;
      } else {
        if (result2.issues.length === 0)
          return result2;
        results.push(result2);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleUnionResults(results2, payload, inst, ctx);
    });
  };
});
const $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  const _super = inst._zod.parse;
  defineLazy(inst._zod, "propValues", () => {
    const propValues = {};
    for (const option of def.options) {
      const pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
      for (const [k, v] of Object.entries(pv)) {
        if (!propValues[k])
          propValues[k] = /* @__PURE__ */ new Set();
        for (const val2 of v) {
          propValues[k].add(val2);
        }
      }
    }
    return propValues;
  });
  const disc = cached(() => {
    const opts = def.options;
    const map2 = /* @__PURE__ */ new Map();
    for (const o of opts) {
      const values = o._zod.propValues[def.discriminator];
      if (!values || values.size === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
      for (const v of values) {
        if (map2.has(v)) {
          throw new Error(`Duplicate discriminator value "${String(v)}"`);
        }
        map2.set(v, o);
      }
    }
    return map2;
  });
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isObject(input)) {
      payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input,
        inst
      });
      return payload;
    }
    const opt = disc.value.get(input?.[def.discriminator]);
    if (opt) {
      return opt._zod.run(payload, ctx);
    }
    if (def.unionFallback) {
      return _super(payload, ctx);
    }
    payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      input,
      path: [def.discriminator],
      inst
    });
    return payload;
  };
});
const $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left2, right2]) => {
        return handleIntersectionResults(payload, left2, right2);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index2 = 0; index2 < a.length; index2++) {
      const itemA = a[index2];
      const itemB = b[index2];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index2, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result2, left, right) {
  if (left.issues.length) {
    result2.issues.push(...left.issues);
  }
  if (right.issues.length) {
    result2.issues.push(...right.issues);
  }
  if (aborted(result2))
    return result2;
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result2.value = merged.data;
  return result2;
}
const $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
  $ZodType.init(inst, def);
  const items = def.items;
  const optStart = items.length - [...items].reverse().findIndex((item) => item._zod.optin !== "optional");
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        input,
        inst,
        expected: "tuple",
        code: "invalid_type"
      });
      return payload;
    }
    payload.value = [];
    const proms = [];
    if (!def.rest) {
      const tooBig = input.length > items.length;
      const tooSmall = input.length < optStart - 1;
      if (tooBig || tooSmall) {
        payload.issues.push({
          input,
          inst,
          origin: "array",
          ...tooBig ? { code: "too_big", maximum: items.length } : { code: "too_small", minimum: items.length }
        });
        return payload;
      }
    }
    let i = -1;
    for (const item of items) {
      i++;
      if (i >= input.length) {
        if (i >= optStart)
          continue;
      }
      const result2 = item._zod.run({
        value: input[i],
        issues: []
      }, ctx);
      if (result2 instanceof Promise) {
        proms.push(result2.then((result3) => handleTupleResult(result3, payload, i)));
      } else {
        handleTupleResult(result2, payload, i);
      }
    }
    if (def.rest) {
      const rest = input.slice(items.length);
      for (const el of rest) {
        i++;
        const result2 = def.rest._zod.run({
          value: el,
          issues: []
        }, ctx);
        if (result2 instanceof Promise) {
          proms.push(result2.then((result3) => handleTupleResult(result3, payload, i)));
        } else {
          handleTupleResult(result2, payload, i);
        }
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleTupleResult(result2, final, index2) {
  if (result2.issues.length) {
    final.issues.push(...prefixIssues(index2, result2.issues));
  }
  final.value[index2] = result2.value;
}
const $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    if (def.keyType._zod.values) {
      const values = def.keyType._zod.values;
      payload.value = {};
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          const result2 = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result2 instanceof Promise) {
            proms.push(result2.then((result3) => {
              if (result3.issues.length) {
                payload.issues.push(...prefixIssues(key, result3.issues));
              }
              payload.value[key] = result3.value;
            }));
          } else {
            if (result2.issues.length) {
              payload.issues.push(...prefixIssues(key, result2.issues));
            }
            payload.value[key] = result2.value;
          }
        }
      }
      let unrecognized;
      for (const key in input) {
        if (!values.has(key)) {
          unrecognized = unrecognized ?? [];
          unrecognized.push(key);
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized
        });
      }
    } else {
      payload.value = {};
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__")
          continue;
        const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        if (keyResult.issues.length) {
          payload.issues.push({
            origin: "record",
            code: "invalid_key",
            issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
            input: key,
            path: [key],
            inst
          });
          payload.value[keyResult.value] = keyResult.value;
          continue;
        }
        const result2 = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result2 instanceof Promise) {
          proms.push(result2.then((result3) => {
            if (result3.issues.length) {
              payload.issues.push(...prefixIssues(key, result3.issues));
            }
            payload.value[keyResult.value] = result3.value;
          }));
        } else {
          if (result2.issues.length) {
            payload.issues.push(...prefixIssues(key, result2.issues));
          }
          payload.value[keyResult.value] = result2.value;
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
const $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Map)) {
      payload.issues.push({
        expected: "map",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    payload.value = /* @__PURE__ */ new Map();
    for (const [key, value] of input) {
      const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
      const valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
      if (keyResult instanceof Promise || valueResult instanceof Promise) {
        proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
          handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
        }));
      } else {
        handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
  if (keyResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, keyResult.issues));
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_key",
        input,
        inst,
        issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  if (valueResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, valueResult.issues));
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_element",
        input,
        inst,
        key,
        issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  final.value.set(keyResult.value, valueResult.value);
}
const $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Set)) {
      payload.issues.push({
        input,
        inst,
        expected: "set",
        code: "invalid_type"
      });
      return payload;
    }
    const proms = [];
    payload.value = /* @__PURE__ */ new Set();
    for (const item of input) {
      const result2 = def.valueType._zod.run({ value: item, issues: [] }, ctx);
      if (result2 instanceof Promise) {
        proms.push(result2.then((result3) => handleSetResult(result3, payload)));
      } else
        handleSetResult(result2, payload);
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleSetResult(result2, final) {
  if (result2.issues.length) {
    final.issues.push(...result2.issues);
  }
  final.value.add(result2.value);
}
const $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  inst._zod.values = new Set(values);
  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (inst._zod.values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
const $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.values = new Set(def.values);
  inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? o.toString() : String(o)).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (inst._zod.values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
const $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input instanceof File)
      return payload;
    payload.issues.push({
      expected: "file",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
const $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const _out = def.transform(payload.value, payload);
    if (_ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError();
    }
    payload.value = _out;
    return payload;
  };
});
const $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (def.innerType._zod.optin === "optional") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === void 0) {
      return payload;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
const $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
  });
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
const $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result2 = def.innerType._zod.run(payload, ctx);
    if (result2 instanceof Promise) {
      return result2.then((result3) => handleDefaultResult(result3, def));
    }
    return handleDefaultResult(result2, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === void 0) {
    payload.value = def.defaultValue;
  }
  return payload;
}
const $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
const $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => {
    const v = def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    const result2 = def.innerType._zod.run(payload, ctx);
    if (result2 instanceof Promise) {
      return result2.then((result3) => handleNonOptionalResult(result3, inst));
    }
    return handleNonOptionalResult(result2, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === void 0) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
const $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const result2 = def.innerType._zod.run(payload, ctx);
    if (result2 instanceof Promise) {
      return result2.then((result3) => {
        payload.value = result3.issues.length === 0;
        return payload;
      });
    }
    payload.value = result2.issues.length === 0;
    return payload;
  };
});
const $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    const result2 = def.innerType._zod.run(payload, ctx);
    if (result2 instanceof Promise) {
      return result2.then((result3) => {
        payload.value = result3.value;
        if (result3.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result3.issues.map((iss) => finalizeIssue(iss, ctx, config()))
            },
            input: payload.value
          });
          payload.issues = [];
        }
        return payload;
      });
    }
    payload.value = result2.value;
    if (result2.issues.length) {
      payload.value = def.catchValue({
        ...payload,
        error: {
          issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config()))
        },
        input: payload.value
      });
      payload.issues = [];
    }
    return payload;
  };
});
const $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "nan",
        code: "invalid_type"
      });
      return payload;
    }
    return payload;
  };
});
const $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  inst._zod.parse = (payload, ctx) => {
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left2) => handlePipeResult(left2, def, ctx));
    }
    return handlePipeResult(left, def, ctx);
  };
});
function handlePipeResult(left, def, ctx) {
  if (aborted(left)) {
    return left;
  }
  return def.out._zod.run({ value: left.value, issues: left.issues }, ctx);
}
const $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  inst._zod.parse = (payload, ctx) => {
    const result2 = def.innerType._zod.run(payload, ctx);
    if (result2 instanceof Promise) {
      return result2.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result2);
  };
});
function handleReadonlyResult(payload) {
  payload.value = Object.freeze(payload.value);
  return payload;
}
const $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  const regexParts = [];
  for (const part of def.parts) {
    if (part instanceof $ZodType) {
      if (!part._zod.pattern) {
        throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
      }
      const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
      if (!source)
        throw new Error(`Invalid template literal part: ${part._zod.traits}`);
      const start = source.startsWith("^") ? 1 : 0;
      const end = source.endsWith("$") ? source.length - 1 : source.length;
      regexParts.push(source.slice(start, end));
    } else if (part === null || primitiveTypes.has(typeof part)) {
      regexParts.push(escapeRegex(`${part}`));
    } else {
      throw new Error(`Invalid template literal part: ${part}`);
    }
  }
  inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "string") {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "template_literal",
        code: "invalid_type"
      });
      return payload;
    }
    inst._zod.pattern.lastIndex = 0;
    if (!inst._zod.pattern.test(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        code: "invalid_format",
        format: "template_literal",
        pattern: inst._zod.pattern.source
      });
      return payload;
    }
    return payload;
  };
});
const $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
  };
});
const $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "innerType", () => def.getter());
  defineLazy(inst._zod, "pattern", () => inst._zod.innerType._zod.pattern);
  defineLazy(inst._zod, "propValues", () => inst._zod.innerType._zod.propValues);
  defineLazy(inst._zod, "optin", () => inst._zod.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => inst._zod.innerType._zod.optout);
  inst._zod.parse = (payload, ctx) => {
    const inner = inst._zod.innerType;
    return inner._zod.run(payload, ctx);
  };
});
const $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result2, payload, input, inst) {
  if (!result2) {
    const _iss = {
      code: "custom",
      input,
      inst,
      // incorporates params.error into issue reporting
      path: [...inst._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !inst._zod.def.abort
      // params: inst._zod.def.params,
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}
const error$C = () => {
  const Sizable = {
    string: { unit: "حرف", verb: "أن يحوي" },
    file: { unit: "بايت", verb: "أن يحوي" },
    array: { unit: "عنصر", verb: "أن يحوي" },
    set: { unit: "عنصر", verb: "أن يحوي" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "number";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "مدخل",
    email: "بريد إلكتروني",
    url: "رابط",
    emoji: "إيموجي",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "تاريخ ووقت بمعيار ISO",
    date: "تاريخ بمعيار ISO",
    time: "وقت بمعيار ISO",
    duration: "مدة بمعيار ISO",
    ipv4: "عنوان IPv4",
    ipv6: "عنوان IPv6",
    cidrv4: "مدى عناوين بصيغة IPv4",
    cidrv6: "مدى عناوين بصيغة IPv6",
    base64: "نَص بترميز base64-encoded",
    base64url: "نَص بترميز base64url-encoded",
    json_string: "نَص على هيئة JSON",
    e164: "رقم هاتف بمعيار E.164",
    jwt: "JWT",
    template_literal: "مدخل"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `مدخلات غير مقبولة: يفترض إدخال ${issue2.expected}، ولكن تم إدخال ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `مدخلات غير مقبولة: يفترض إدخال ${stringifyPrimitive(issue2.values[0])}`;
        return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return ` أكبر من اللازم: يفترض أن تكون ${issue2.origin ?? "القيمة"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "عنصر"}`;
        return `أكبر من اللازم: يفترض أن تكون ${issue2.origin ?? "القيمة"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `أصغر من اللازم: يفترض لـ ${issue2.origin} أن يكون ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `أصغر من اللازم: يفترض لـ ${issue2.origin} أن يكون ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `نَص غير مقبول: يجب أن يبدأ بـ "${issue2.prefix}"`;
        if (_issue.format === "ends_with")
          return `نَص غير مقبول: يجب أن ينتهي بـ "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `نَص غير مقبول: يجب أن يتضمَّن "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `نَص غير مقبول: يجب أن يطابق النمط ${_issue.pattern}`;
        return `${Nouns[_issue.format] ?? issue2.format} غير مقبول`;
      }
      case "not_multiple_of":
        return `رقم غير مقبول: يجب أن يكون من مضاعفات ${issue2.divisor}`;
      case "unrecognized_keys":
        return `معرف${issue2.keys.length > 1 ? "ات" : ""} غريب${issue2.keys.length > 1 ? "ة" : ""}: ${joinValues(issue2.keys, "، ")}`;
      case "invalid_key":
        return `معرف غير مقبول في ${issue2.origin}`;
      case "invalid_union":
        return "مدخل غير مقبول";
      case "invalid_element":
        return `مدخل غير مقبول في ${issue2.origin}`;
      default:
        return "مدخل غير مقبول";
    }
  };
};
function ar() {
  return {
    localeError: error$C()
  };
}
const error$B = () => {
  const Sizable = {
    string: { unit: "simvol", verb: "olmalıdır" },
    file: { unit: "bayt", verb: "olmalıdır" },
    array: { unit: "element", verb: "olmalıdır" },
    set: { unit: "element", verb: "olmalıdır" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "number";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Yanlış dəyər: gözlənilən ${issue2.expected}, daxil olan ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Yanlış dəyər: gözlənilən ${stringifyPrimitive(issue2.values[0])}`;
        return `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çox böyük: gözlənilən ${issue2.origin ?? "dəyər"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `Çox böyük: gözlənilən ${issue2.origin ?? "dəyər"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çox kiçik: gözlənilən ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `Çox kiçik: gözlənilən ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Yanlış mətn: "${_issue.prefix}" ilə başlamalıdır`;
        if (_issue.format === "ends_with")
          return `Yanlış mətn: "${_issue.suffix}" ilə bitməlidir`;
        if (_issue.format === "includes")
          return `Yanlış mətn: "${_issue.includes}" daxil olmalıdır`;
        if (_issue.format === "regex")
          return `Yanlış mətn: ${_issue.pattern} şablonuna uyğun olmalıdır`;
        return `Yanlış ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Yanlış ədəd: ${issue2.divisor} ilə bölünə bilən olmalıdır`;
      case "unrecognized_keys":
        return `Tanınmayan açar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} daxilində yanlış açar`;
      case "invalid_union":
        return "Yanlış dəyər";
      case "invalid_element":
        return `${issue2.origin} daxilində yanlış dəyər`;
      default:
        return `Yanlış dəyər`;
    }
  };
};
function az() {
  return {
    localeError: error$B()
  };
}
function getBelarusianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
const error$A = () => {
  const Sizable = {
    string: {
      unit: {
        one: "сімвал",
        few: "сімвалы",
        many: "сімвалаў"
      },
      verb: "мець"
    },
    array: {
      unit: {
        one: "элемент",
        few: "элементы",
        many: "элементаў"
      },
      verb: "мець"
    },
    set: {
      unit: {
        one: "элемент",
        few: "элементы",
        many: "элементаў"
      },
      verb: "мець"
    },
    file: {
      unit: {
        one: "байт",
        few: "байты",
        many: "байтаў"
      },
      verb: "мець"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "лік";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "масіў";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "увод",
    email: "email адрас",
    url: "URL",
    emoji: "эмодзі",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO дата і час",
    date: "ISO дата",
    time: "ISO час",
    duration: "ISO працягласць",
    ipv4: "IPv4 адрас",
    ipv6: "IPv6 адрас",
    cidrv4: "IPv4 дыяпазон",
    cidrv6: "IPv6 дыяпазон",
    base64: "радок у фармаце base64",
    base64url: "радок у фармаце base64url",
    json_string: "JSON радок",
    e164: "нумар E.164",
    jwt: "JWT",
    template_literal: "увод"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Няправільны ўвод: чакаўся ${issue2.expected}, атрымана ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Няправільны ўвод: чакалася ${stringifyPrimitive(issue2.values[0])}`;
        return `Няправільны варыянт: чакаўся адзін з ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Занадта вялікі: чакалася, што ${issue2.origin ?? "значэнне"} павінна ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `Занадта вялікі: чакалася, што ${issue2.origin ?? "значэнне"} павінна быць ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Занадта малы: чакалася, што ${issue2.origin} павінна ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `Занадта малы: чакалася, што ${issue2.origin} павінна быць ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Няправільны радок: павінен пачынацца з "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Няправільны радок: павінен заканчвацца на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Няправільны радок: павінен змяшчаць "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Няправільны радок: павінен адпавядаць шаблону ${_issue.pattern}`;
        return `Няправільны ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Няправільны лік: павінен быць кратным ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Нераспазнаны ${issue2.keys.length > 1 ? "ключы" : "ключ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Няправільны ключ у ${issue2.origin}`;
      case "invalid_union":
        return "Няправільны ўвод";
      case "invalid_element":
        return `Няправільнае значэнне ў ${issue2.origin}`;
      default:
        return `Няправільны ўвод`;
    }
  };
};
function be() {
  return {
    localeError: error$A()
  };
}
const error$z = () => {
  const Sizable = {
    string: { unit: "caràcters", verb: "contenir" },
    file: { unit: "bytes", verb: "contenir" },
    array: { unit: "elements", verb: "contenir" },
    set: { unit: "elements", verb: "contenir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "number";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "entrada",
    email: "adreça electrònica",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "durada ISO",
    ipv4: "adreça IPv4",
    ipv6: "adreça IPv6",
    cidrv4: "rang IPv4",
    cidrv6: "rang IPv6",
    base64: "cadena codificada en base64",
    base64url: "cadena codificada en base64url",
    json_string: "cadena JSON",
    e164: "número E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Tipus invàlid: s'esperava ${issue2.expected}, s'ha rebut ${parsedType2(issue2.input)}`;
      // return `Tipus invàlid: s'esperava ${issue.expected}, s'ha rebut ${util.getParsedType(issue.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Valor invàlid: s'esperava ${stringifyPrimitive(issue2.values[0])}`;
        return `Opció invàlida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "com a màxim" : "menys de";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingués ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "com a mínim" : "més de";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Massa petit: s'esperava que ${issue2.origin} contingués ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Format invàlid: ha de començar amb "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Format invàlid: ha d'acabar amb "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Format invàlid: ha d'incloure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Format invàlid: ha de coincidir amb el patró ${_issue.pattern}`;
        return `Format invàlid per a ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Número invàlid: ha de ser múltiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clau invàlida a ${issue2.origin}`;
      case "invalid_union":
        return "Entrada invàlida";
      // Could also be "Tipus d'unió invàlid" but "Entrada invàlida" is more general
      case "invalid_element":
        return `Element invàlid a ${issue2.origin}`;
      default:
        return `Entrada invàlida`;
    }
  };
};
function ca() {
  return {
    localeError: error$z()
  };
}
const error$y = () => {
  const Sizable = {
    string: { unit: "znaků", verb: "mít" },
    file: { unit: "bajtů", verb: "mít" },
    array: { unit: "prvků", verb: "mít" },
    set: { unit: "prvků", verb: "mít" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "číslo";
      }
      case "string": {
        return "řetězec";
      }
      case "boolean": {
        return "boolean";
      }
      case "bigint": {
        return "bigint";
      }
      case "function": {
        return "funkce";
      }
      case "symbol": {
        return "symbol";
      }
      case "undefined": {
        return "undefined";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "pole";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "regulární výraz",
    email: "e-mailová adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "datum a čas ve formátu ISO",
    date: "datum ve formátu ISO",
    time: "čas ve formátu ISO",
    duration: "doba trvání ISO",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    cidrv4: "rozsah IPv4",
    cidrv6: "rozsah IPv6",
    base64: "řetězec zakódovaný ve formátu base64",
    base64url: "řetězec zakódovaný ve formátu base64url",
    json_string: "řetězec ve formátu JSON",
    e164: "číslo E.164",
    jwt: "JWT",
    template_literal: "vstup"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Neplatný vstup: očekáváno ${issue2.expected}, obdrženo ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neplatný vstup: očekáváno ${stringifyPrimitive(issue2.values[0])}`;
        return `Neplatná možnost: očekávána jedna z hodnot ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je příliš velká: ${issue2.origin ?? "hodnota"} musí mít ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvků"}`;
        }
        return `Hodnota je příliš velká: ${issue2.origin ?? "hodnota"} musí být ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je příliš malá: ${issue2.origin ?? "hodnota"} musí mít ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvků"}`;
        }
        return `Hodnota je příliš malá: ${issue2.origin ?? "hodnota"} musí být ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Neplatný řetězec: musí začínat na "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neplatný řetězec: musí končit na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neplatný řetězec: musí obsahovat "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neplatný řetězec: musí odpovídat vzoru ${_issue.pattern}`;
        return `Neplatný formát ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neplatné číslo: musí být násobkem ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neznámé klíče: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neplatný klíč v ${issue2.origin}`;
      case "invalid_union":
        return "Neplatný vstup";
      case "invalid_element":
        return `Neplatná hodnota v ${issue2.origin}`;
      default:
        return `Neplatný vstup`;
    }
  };
};
function cs() {
  return {
    localeError: error$y()
  };
}
const error$x = () => {
  const Sizable = {
    string: { unit: "Zeichen", verb: "zu haben" },
    file: { unit: "Bytes", verb: "zu haben" },
    array: { unit: "Elemente", verb: "zu haben" },
    set: { unit: "Elemente", verb: "zu haben" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "Zahl";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "Array";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "Eingabe",
    email: "E-Mail-Adresse",
    url: "URL",
    emoji: "Emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-Datum und -Uhrzeit",
    date: "ISO-Datum",
    time: "ISO-Uhrzeit",
    duration: "ISO-Dauer",
    ipv4: "IPv4-Adresse",
    ipv6: "IPv6-Adresse",
    cidrv4: "IPv4-Bereich",
    cidrv6: "IPv6-Bereich",
    base64: "Base64-codierter String",
    base64url: "Base64-URL-codierter String",
    json_string: "JSON-String",
    e164: "E.164-Nummer",
    jwt: "JWT",
    template_literal: "Eingabe"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Ungültige Eingabe: erwartet ${issue2.expected}, erhalten ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ungültige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ungültige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Zu groß: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
        return `Zu groß: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat`;
        }
        return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ungültiger String: muss mit "${_issue.prefix}" beginnen`;
        if (_issue.format === "ends_with")
          return `Ungültiger String: muss mit "${_issue.suffix}" enden`;
        if (_issue.format === "includes")
          return `Ungültiger String: muss "${_issue.includes}" enthalten`;
        if (_issue.format === "regex")
          return `Ungültiger String: muss dem Muster ${_issue.pattern} entsprechen`;
        return `Ungültig: ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ungültige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ungültiger Schlüssel in ${issue2.origin}`;
      case "invalid_union":
        return "Ungültige Eingabe";
      case "invalid_element":
        return `Ungültiger Wert in ${issue2.origin}`;
      default:
        return `Ungültige Eingabe`;
    }
  };
};
function de() {
  return {
    localeError: error$x()
  };
}
const parsedType$2 = (data) => {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "NaN" : "number";
    }
    case "object": {
      if (Array.isArray(data)) {
        return "array";
      }
      if (data === null) {
        return "null";
      }
      if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
        return data.constructor.name;
      }
    }
  }
  return t;
};
const error$w = () => {
  const Sizable = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const Nouns = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Invalid input: expected ${issue2.expected}, received ${parsedType$2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Invalid string: must start with "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Invalid string: must end with "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Invalid string: must include "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Invalid string: must match pattern ${_issue.pattern}`;
        return `Invalid ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue2.origin}`;
      case "invalid_union":
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue2.origin}`;
      default:
        return `Invalid input`;
    }
  };
};
function en() {
  return {
    localeError: error$w()
  };
}
const parsedType$1 = (data) => {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "NaN" : "nombro";
    }
    case "object": {
      if (Array.isArray(data)) {
        return "tabelo";
      }
      if (data === null) {
        return "senvalora";
      }
      if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
        return data.constructor.name;
      }
    }
  }
  return t;
};
const error$v = () => {
  const Sizable = {
    string: { unit: "karaktrojn", verb: "havi" },
    file: { unit: "bajtojn", verb: "havi" },
    array: { unit: "elementojn", verb: "havi" },
    set: { unit: "elementojn", verb: "havi" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const Nouns = {
    regex: "enigo",
    email: "retadreso",
    url: "URL",
    emoji: "emoĝio",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datotempo",
    date: "ISO-dato",
    time: "ISO-tempo",
    duration: "ISO-daŭro",
    ipv4: "IPv4-adreso",
    ipv6: "IPv6-adreso",
    cidrv4: "IPv4-rango",
    cidrv6: "IPv6-rango",
    base64: "64-ume kodita karaktraro",
    base64url: "URL-64-ume kodita karaktraro",
    json_string: "JSON-karaktraro",
    e164: "E.164-nombro",
    jwt: "JWT",
    template_literal: "enigo"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Nevalida enigo: atendiĝis ${issue2.expected}, riceviĝis ${parsedType$1(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nevalida enigo: atendiĝis ${stringifyPrimitive(issue2.values[0])}`;
        return `Nevalida opcio: atendiĝis unu el ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Tro granda: atendiĝis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
        return `Tro granda: atendiĝis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Tro malgranda: atendiĝis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Tro malgranda: atendiĝis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nevalida karaktraro: devas komenciĝi per "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nevalida karaktraro: devas finiĝi per "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
        return `Nevalida ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nekonata${issue2.keys.length > 1 ? "j" : ""} ŝlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nevalida ŝlosilo en ${issue2.origin}`;
      case "invalid_union":
        return "Nevalida enigo";
      case "invalid_element":
        return `Nevalida valoro en ${issue2.origin}`;
      default:
        return `Nevalida enigo`;
    }
  };
};
function eo() {
  return {
    localeError: error$v()
  };
}
const error$u = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "tener" },
    file: { unit: "bytes", verb: "tener" },
    array: { unit: "elementos", verb: "tener" },
    set: { unit: "elementos", verb: "tener" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "número";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "arreglo";
        }
        if (data === null) {
          return "nulo";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "entrada",
    email: "dirección de correo electrónico",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "fecha y hora ISO",
    date: "fecha ISO",
    time: "hora ISO",
    duration: "duración ISO",
    ipv4: "dirección IPv4",
    ipv6: "dirección IPv6",
    cidrv4: "rango IPv4",
    cidrv6: "rango IPv6",
    base64: "cadena codificada en base64",
    base64url: "URL codificada en base64",
    json_string: "cadena JSON",
    e164: "número E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Entrada inválida: se esperaba ${issue2.expected}, recibido ${parsedType2(issue2.input)}`;
      // return `Entrada inválida: se esperaba ${issue.expected}, recibido ${util.getParsedType(issue.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inválida: se esperaba ${stringifyPrimitive(issue2.values[0])}`;
        return `Opción inválida: se esperaba una de ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Demasiado grande: se esperaba que ${issue2.origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Demasiado grande: se esperaba que ${issue2.origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Demasiado pequeño: se esperaba que ${issue2.origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Demasiado pequeño: se esperaba que ${issue2.origin} fuera ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Cadena inválida: debe comenzar con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cadena inválida: debe terminar en "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cadena inválida: debe incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cadena inválida: debe coincidir con el patrón ${_issue.pattern}`;
        return `Inválido ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Número inválido: debe ser múltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Llave inválida en ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inválida";
      case "invalid_element":
        return `Valor inválido en ${issue2.origin}`;
      default:
        return `Entrada inválida`;
    }
  };
};
function es() {
  return {
    localeError: error$u()
  };
}
const error$t = () => {
  const Sizable = {
    string: { unit: "کاراکتر", verb: "داشته باشد" },
    file: { unit: "بایت", verb: "داشته باشد" },
    array: { unit: "آیتم", verb: "داشته باشد" },
    set: { unit: "آیتم", verb: "داشته باشد" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "عدد";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "آرایه";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "ورودی",
    email: "آدرس ایمیل",
    url: "URL",
    emoji: "ایموجی",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "تاریخ و زمان ایزو",
    date: "تاریخ ایزو",
    time: "زمان ایزو",
    duration: "مدت زمان ایزو",
    ipv4: "IPv4 آدرس",
    ipv6: "IPv6 آدرس",
    cidrv4: "IPv4 دامنه",
    cidrv6: "IPv6 دامنه",
    base64: "base64-encoded رشته",
    base64url: "base64url-encoded رشته",
    json_string: "JSON رشته",
    e164: "E.164 عدد",
    jwt: "JWT",
    template_literal: "ورودی"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `ورودی نامعتبر: می‌بایست ${issue2.expected} می‌بود، ${parsedType2(issue2.input)} دریافت شد`;
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `ورودی نامعتبر: می‌بایست ${stringifyPrimitive(issue2.values[0])} می‌بود`;
        }
        return `گزینه نامعتبر: می‌بایست یکی از ${joinValues(issue2.values, "|")} می‌بود`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `خیلی بزرگ: ${issue2.origin ?? "مقدار"} باید ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عنصر"} باشد`;
        }
        return `خیلی بزرگ: ${issue2.origin ?? "مقدار"} باید ${adj}${issue2.maximum.toString()} باشد`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `خیلی کوچک: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} ${sizing.unit} باشد`;
        }
        return `خیلی کوچک: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} باشد`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `رشته نامعتبر: باید با "${_issue.prefix}" شروع شود`;
        }
        if (_issue.format === "ends_with") {
          return `رشته نامعتبر: باید با "${_issue.suffix}" تمام شود`;
        }
        if (_issue.format === "includes") {
          return `رشته نامعتبر: باید شامل "${_issue.includes}" باشد`;
        }
        if (_issue.format === "regex") {
          return `رشته نامعتبر: باید با الگوی ${_issue.pattern} مطابقت داشته باشد`;
        }
        return `${Nouns[_issue.format] ?? issue2.format} نامعتبر`;
      }
      case "not_multiple_of":
        return `عدد نامعتبر: باید مضرب ${issue2.divisor} باشد`;
      case "unrecognized_keys":
        return `کلید${issue2.keys.length > 1 ? "های" : ""} ناشناس: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `کلید ناشناس در ${issue2.origin}`;
      case "invalid_union":
        return `ورودی نامعتبر`;
      case "invalid_element":
        return `مقدار نامعتبر در ${issue2.origin}`;
      default:
        return `ورودی نامعتبر`;
    }
  };
};
function fa() {
  return {
    localeError: error$t()
  };
}
const error$s = () => {
  const Sizable = {
    string: { unit: "merkkiä", subject: "merkkijonon" },
    file: { unit: "tavua", subject: "tiedoston" },
    array: { unit: "alkiota", subject: "listan" },
    set: { unit: "alkiota", subject: "joukon" },
    number: { unit: "", subject: "luvun" },
    bigint: { unit: "", subject: "suuren kokonaisluvun" },
    int: { unit: "", subject: "kokonaisluvun" },
    date: { unit: "", subject: "päivämäärän" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "number";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "säännöllinen lauseke",
    email: "sähköpostiosoite",
    url: "URL-osoite",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-aikaleima",
    date: "ISO-päivämäärä",
    time: "ISO-aika",
    duration: "ISO-kesto",
    ipv4: "IPv4-osoite",
    ipv6: "IPv6-osoite",
    cidrv4: "IPv4-alue",
    cidrv6: "IPv6-alue",
    base64: "base64-koodattu merkkijono",
    base64url: "base64url-koodattu merkkijono",
    json_string: "JSON-merkkijono",
    e164: "E.164-luku",
    jwt: "JWT",
    template_literal: "templaattimerkkijono"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Virheellinen tyyppi: odotettiin ${issue2.expected}, oli ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Virheellinen syöte: täytyy olla ${stringifyPrimitive(issue2.values[0])}`;
        return `Virheellinen valinta: täytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian suuri: ${sizing.subject} täytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian suuri: arvon täytyy olla ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian pieni: ${sizing.subject} täytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian pieni: arvon täytyy olla ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Virheellinen syöte: täytyy alkaa "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Virheellinen syöte: täytyy loppua "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Virheellinen syöte: täytyy sisältää "${_issue.includes}"`;
        if (_issue.format === "regex") {
          return `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${_issue.pattern}`;
        }
        return `Virheellinen ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: täytyy olla luvun ${issue2.divisor} monikerta`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return `Virheellinen syöte`;
    }
  };
};
function fi() {
  return {
    localeError: error$s()
  };
}
const error$r = () => {
  const Sizable = {
    string: { unit: "caractères", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "éléments", verb: "avoir" },
    set: { unit: "éléments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "nombre";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "tableau";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "entrée",
    email: "adresse e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date et heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "durée ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "chaîne encodée en base64",
    base64url: "chaîne encodée en base64url",
    json_string: "chaîne JSON",
    e164: "numéro E.164",
    jwt: "JWT",
    template_literal: "entrée"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Entrée invalide : ${issue2.expected} attendu, ${parsedType2(issue2.input)} reçu`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrée invalide : ${stringifyPrimitive(issue2.values[0])} attendu`;
        return `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : ${issue2.origin ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "élément(s)"}`;
        return `Trop grand : ${issue2.origin ?? "valeur"} doit être ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : ${issue2.origin} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : ${issue2.origin} doit être ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chaîne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chaîne invalide : doit correspondre au modèle ${_issue.pattern}`;
        return `${Nouns[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit être un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clé${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clé invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entrée invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entrée invalide`;
    }
  };
};
function fr() {
  return {
    localeError: error$r()
  };
}
const error$q = () => {
  const Sizable = {
    string: { unit: "caractères", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "éléments", verb: "avoir" },
    set: { unit: "éléments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "number";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "entrée",
    email: "adresse courriel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date-heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "durée ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "chaîne encodée en base64",
    base64url: "chaîne encodée en base64url",
    json_string: "chaîne JSON",
    e164: "numéro E.164",
    jwt: "JWT",
    template_literal: "entrée"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Entrée invalide : attendu ${issue2.expected}, reçu ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrée invalide : attendu ${stringifyPrimitive(issue2.values[0])}`;
        return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "≤" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "≥" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chaîne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chaîne invalide : doit correspondre au motif ${_issue.pattern}`;
        return `${Nouns[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit être un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clé${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clé invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entrée invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entrée invalide`;
    }
  };
};
function frCA() {
  return {
    localeError: error$q()
  };
}
const error$p = () => {
  const Sizable = {
    string: { unit: "אותיות", verb: "לכלול" },
    file: { unit: "בייטים", verb: "לכלול" },
    array: { unit: "פריטים", verb: "לכלול" },
    set: { unit: "פריטים", verb: "לכלול" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "number";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "קלט",
    email: "כתובת אימייל",
    url: "כתובת רשת",
    emoji: "אימוג'י",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "תאריך וזמן ISO",
    date: "תאריך ISO",
    time: "זמן ISO",
    duration: "משך זמן ISO",
    ipv4: "כתובת IPv4",
    ipv6: "כתובת IPv6",
    cidrv4: "טווח IPv4",
    cidrv6: "טווח IPv6",
    base64: "מחרוזת בבסיס 64",
    base64url: "מחרוזת בבסיס 64 לכתובות רשת",
    json_string: "מחרוזת JSON",
    e164: "מספר E.164",
    jwt: "JWT",
    template_literal: "קלט"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `קלט לא תקין: צריך ${issue2.expected}, התקבל ${parsedType2(issue2.input)}`;
      // return `Invalid input: expected ${issue.expected}, received ${util.getParsedType(issue.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `קלט לא תקין: צריך ${stringifyPrimitive(issue2.values[0])}`;
        return `קלט לא תקין: צריך אחת מהאפשרויות  ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `גדול מדי: ${issue2.origin ?? "value"} צריך להיות ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `גדול מדי: ${issue2.origin ?? "value"} צריך להיות ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `קטן מדי: ${issue2.origin} צריך להיות ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `קטן מדי: ${issue2.origin} צריך להיות ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `מחרוזת לא תקינה: חייבת להתחיל ב"${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `מחרוזת לא תקינה: חייבת להסתיים ב "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `מחרוזת לא תקינה: חייבת לכלול "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `מחרוזת לא תקינה: חייבת להתאים לתבנית ${_issue.pattern}`;
        return `${Nouns[_issue.format] ?? issue2.format} לא תקין`;
      }
      case "not_multiple_of":
        return `מספר לא תקין: חייב להיות מכפלה של ${issue2.divisor}`;
      case "unrecognized_keys":
        return `מפתח${issue2.keys.length > 1 ? "ות" : ""} לא מזוה${issue2.keys.length > 1 ? "ים" : "ה"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `מפתח לא תקין ב${issue2.origin}`;
      case "invalid_union":
        return "קלט לא תקין";
      case "invalid_element":
        return `ערך לא תקין ב${issue2.origin}`;
      default:
        return `קלט לא תקין`;
    }
  };
};
function he() {
  return {
    localeError: error$p()
  };
}
const error$o = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "legyen" },
    file: { unit: "byte", verb: "legyen" },
    array: { unit: "elem", verb: "legyen" },
    set: { unit: "elem", verb: "legyen" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "szám";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "tömb";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "bemenet",
    email: "email cím",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO időbélyeg",
    date: "ISO dátum",
    time: "ISO idő",
    duration: "ISO időintervallum",
    ipv4: "IPv4 cím",
    ipv6: "IPv6 cím",
    cidrv4: "IPv4 tartomány",
    cidrv6: "IPv6 tartomány",
    base64: "base64-kódolt string",
    base64url: "base64url-kódolt string",
    json_string: "JSON string",
    e164: "E.164 szám",
    jwt: "JWT",
    template_literal: "bemenet"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Érvénytelen bemenet: a várt érték ${issue2.expected}, a kapott érték ${parsedType2(issue2.input)}`;
      // return `Invalid input: expected ${issue.expected}, received ${util.getParsedType(issue.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Érvénytelen bemenet: a várt érték ${stringifyPrimitive(issue2.values[0])}`;
        return `Érvénytelen opció: valamelyik érték várt ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Túl nagy: ${issue2.origin ?? "érték"} mérete túl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}`;
        return `Túl nagy: a bemeneti érték ${issue2.origin ?? "érték"} túl nagy: ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Túl kicsi: a bemeneti érték ${issue2.origin} mérete túl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Túl kicsi: a bemeneti érték ${issue2.origin} túl kicsi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Érvénytelen string: "${_issue.prefix}" értékkel kell kezdődnie`;
        if (_issue.format === "ends_with")
          return `Érvénytelen string: "${_issue.suffix}" értékkel kell végződnie`;
        if (_issue.format === "includes")
          return `Érvénytelen string: "${_issue.includes}" értéket kell tartalmaznia`;
        if (_issue.format === "regex")
          return `Érvénytelen string: ${_issue.pattern} mintának kell megfelelnie`;
        return `Érvénytelen ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Érvénytelen szám: ${issue2.divisor} többszörösének kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Érvénytelen kulcs ${issue2.origin}`;
      case "invalid_union":
        return "Érvénytelen bemenet";
      case "invalid_element":
        return `Érvénytelen érték: ${issue2.origin}`;
      default:
        return `Érvénytelen bemenet`;
    }
  };
};
function hu() {
  return {
    localeError: error$o()
  };
}
const error$n = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "memiliki" },
    file: { unit: "byte", verb: "memiliki" },
    array: { unit: "item", verb: "memiliki" },
    set: { unit: "item", verb: "memiliki" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "number";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "input",
    email: "alamat email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tanggal dan waktu format ISO",
    date: "tanggal format ISO",
    time: "jam format ISO",
    duration: "durasi format ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "rentang alamat IPv4",
    cidrv6: "rentang alamat IPv6",
    base64: "string dengan enkode base64",
    base64url: "string dengan enkode base64url",
    json_string: "string JSON",
    e164: "angka E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Input tidak valid: diharapkan ${issue2.expected}, diterima ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak valid: harus menyertakan "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
        return `${Nouns[_issue.format] ?? issue2.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${issue2.origin}`;
      default:
        return `Input tidak valid`;
    }
  };
};
function id() {
  return {
    localeError: error$n()
  };
}
const error$m = () => {
  const Sizable = {
    string: { unit: "caratteri", verb: "avere" },
    file: { unit: "byte", verb: "avere" },
    array: { unit: "elementi", verb: "avere" },
    set: { unit: "elementi", verb: "avere" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "numero";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "vettore";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "input",
    email: "indirizzo email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e ora ISO",
    date: "data ISO",
    time: "ora ISO",
    duration: "durata ISO",
    ipv4: "indirizzo IPv4",
    ipv6: "indirizzo IPv6",
    cidrv4: "intervallo IPv4",
    cidrv6: "intervallo IPv6",
    base64: "stringa codificata in base64",
    base64url: "URL codificata in base64",
    json_string: "stringa JSON",
    e164: "numero E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Input non valido: atteso ${issue2.expected}, ricevuto ${parsedType2(issue2.input)}`;
      // return `Input non valido: atteso ${issue.expected}, ricevuto ${util.getParsedType(issue.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}`;
        return `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}`;
        return `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Stringa non valida: deve includere "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
        return `Invalid ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${issue2.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${issue2.origin}`;
      default:
        return `Input non valido`;
    }
  };
};
function it() {
  return {
    localeError: error$m()
  };
}
const error$l = () => {
  const Sizable = {
    string: { unit: "文字", verb: "である" },
    file: { unit: "バイト", verb: "である" },
    array: { unit: "要素", verb: "である" },
    set: { unit: "要素", verb: "である" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "数値";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "配列";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "入力値",
    email: "メールアドレス",
    url: "URL",
    emoji: "絵文字",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO日時",
    date: "ISO日付",
    time: "ISO時刻",
    duration: "ISO期間",
    ipv4: "IPv4アドレス",
    ipv6: "IPv6アドレス",
    cidrv4: "IPv4範囲",
    cidrv6: "IPv6範囲",
    base64: "base64エンコード文字列",
    base64url: "base64urlエンコード文字列",
    json_string: "JSON文字列",
    e164: "E.164番号",
    jwt: "JWT",
    template_literal: "入力値"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `無効な入力: ${issue2.expected}が期待されましたが、${parsedType2(issue2.input)}が入力されました`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `無効な入力: ${stringifyPrimitive(issue2.values[0])}が期待されました`;
        return `無効な選択: ${joinValues(issue2.values, "、")}のいずれかである必要があります`;
      case "too_big": {
        const adj = issue2.inclusive ? "以下である" : "より小さい";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `大きすぎる値: ${issue2.origin ?? "値"}は${issue2.maximum.toString()}${sizing.unit ?? "要素"}${adj}必要があります`;
        return `大きすぎる値: ${issue2.origin ?? "値"}は${issue2.maximum.toString()}${adj}必要があります`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "以上である" : "より大きい";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `小さすぎる値: ${issue2.origin}は${issue2.minimum.toString()}${sizing.unit}${adj}必要があります`;
        return `小さすぎる値: ${issue2.origin}は${issue2.minimum.toString()}${adj}必要があります`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `無効な文字列: "${_issue.prefix}"で始まる必要があります`;
        if (_issue.format === "ends_with")
          return `無効な文字列: "${_issue.suffix}"で終わる必要があります`;
        if (_issue.format === "includes")
          return `無効な文字列: "${_issue.includes}"を含む必要があります`;
        if (_issue.format === "regex")
          return `無効な文字列: パターン${_issue.pattern}に一致する必要があります`;
        return `無効な${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `無効な数値: ${issue2.divisor}の倍数である必要があります`;
      case "unrecognized_keys":
        return `認識されていないキー${issue2.keys.length > 1 ? "群" : ""}: ${joinValues(issue2.keys, "、")}`;
      case "invalid_key":
        return `${issue2.origin}内の無効なキー`;
      case "invalid_union":
        return "無効な入力";
      case "invalid_element":
        return `${issue2.origin}内の無効な値`;
      default:
        return `無効な入力`;
    }
  };
};
function ja() {
  return {
    localeError: error$l()
  };
}
const error$k = () => {
  const Sizable = {
    string: { unit: "តួអក្សរ", verb: "គួរមាន" },
    file: { unit: "បៃ", verb: "គួរមាន" },
    array: { unit: "ធាតុ", verb: "គួរមាន" },
    set: { unit: "ធាតុ", verb: "គួរមាន" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "មិនមែនជាលេខ (NaN)" : "លេខ";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "អារេ (Array)";
        }
        if (data === null) {
          return "គ្មានតម្លៃ (null)";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "ទិន្នន័យបញ្ចូល",
    email: "អាសយដ្ឋានអ៊ីមែល",
    url: "URL",
    emoji: "សញ្ញាអារម្មណ៍",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
    date: "កាលបរិច្ឆេទ ISO",
    time: "ម៉ោង ISO",
    duration: "រយៈពេល ISO",
    ipv4: "អាសយដ្ឋាន IPv4",
    ipv6: "អាសយដ្ឋាន IPv6",
    cidrv4: "ដែនអាសយដ្ឋាន IPv4",
    cidrv6: "ដែនអាសយដ្ឋាន IPv6",
    base64: "ខ្សែអក្សរអ៊ិកូដ base64",
    base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
    json_string: "ខ្សែអក្សរ JSON",
    e164: "លេខ E.164",
    jwt: "JWT",
    template_literal: "ទិន្នន័យបញ្ចូល"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${issue2.expected} ប៉ុន្តែទទួលបាន ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${stringifyPrimitive(issue2.values[0])}`;
        return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `ធំពេក៖ ត្រូវការ ${issue2.origin ?? "តម្លៃ"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "ធាតុ"}`;
        return `ធំពេក៖ ត្រូវការ ${issue2.origin ?? "តម្លៃ"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `តូចពេក៖ ត្រូវការ ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `តូចពេក៖ ត្រូវការ ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${_issue.pattern}`;
        return `មិនត្រឹមត្រូវ៖ ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${issue2.divisor}`;
      case "unrecognized_keys":
        return `រកឃើញសោមិនស្គាល់៖ ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `សោមិនត្រឹមត្រូវនៅក្នុង ${issue2.origin}`;
      case "invalid_union":
        return `ទិន្នន័យមិនត្រឹមត្រូវ`;
      case "invalid_element":
        return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${issue2.origin}`;
      default:
        return `ទិន្នន័យមិនត្រឹមត្រូវ`;
    }
  };
};
function kh() {
  return {
    localeError: error$k()
  };
}
const error$j = () => {
  const Sizable = {
    string: { unit: "문자", verb: "to have" },
    file: { unit: "바이트", verb: "to have" },
    array: { unit: "개", verb: "to have" },
    set: { unit: "개", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "number";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "입력",
    email: "이메일 주소",
    url: "URL",
    emoji: "이모지",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO 날짜시간",
    date: "ISO 날짜",
    time: "ISO 시간",
    duration: "ISO 기간",
    ipv4: "IPv4 주소",
    ipv6: "IPv6 주소",
    cidrv4: "IPv4 범위",
    cidrv6: "IPv6 범위",
    base64: "base64 인코딩 문자열",
    base64url: "base64url 인코딩 문자열",
    json_string: "JSON 문자열",
    e164: "E.164 번호",
    jwt: "JWT",
    template_literal: "입력"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `잘못된 입력: 예상 타입은 ${issue2.expected}, 받은 타입은 ${parsedType2(issue2.input)}입니다`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `잘못된 입력: 값은 ${stringifyPrimitive(issue2.values[0])} 이어야 합니다`;
        return `잘못된 옵션: ${joinValues(issue2.values, "또는 ")} 중 하나여야 합니다`;
      case "too_big": {
        const adj = issue2.inclusive ? "이하" : "미만";
        const suffix = adj === "미만" ? "이어야 합니다" : "여야 합니다";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "요소";
        if (sizing)
          return `${issue2.origin ?? "값"}이 너무 큽니다: ${issue2.maximum.toString()}${unit} ${adj}${suffix}`;
        return `${issue2.origin ?? "값"}이 너무 큽니다: ${issue2.maximum.toString()} ${adj}${suffix}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "이상" : "초과";
        const suffix = adj === "이상" ? "이어야 합니다" : "여야 합니다";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "요소";
        if (sizing) {
          return `${issue2.origin ?? "값"}이 너무 작습니다: ${issue2.minimum.toString()}${unit} ${adj}${suffix}`;
        }
        return `${issue2.origin ?? "값"}이 너무 작습니다: ${issue2.minimum.toString()} ${adj}${suffix}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `잘못된 문자열: "${_issue.prefix}"(으)로 시작해야 합니다`;
        }
        if (_issue.format === "ends_with")
          return `잘못된 문자열: "${_issue.suffix}"(으)로 끝나야 합니다`;
        if (_issue.format === "includes")
          return `잘못된 문자열: "${_issue.includes}"을(를) 포함해야 합니다`;
        if (_issue.format === "regex")
          return `잘못된 문자열: 정규식 ${_issue.pattern} 패턴과 일치해야 합니다`;
        return `잘못된 ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `잘못된 숫자: ${issue2.divisor}의 배수여야 합니다`;
      case "unrecognized_keys":
        return `인식할 수 없는 키: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `잘못된 키: ${issue2.origin}`;
      case "invalid_union":
        return `잘못된 입력`;
      case "invalid_element":
        return `잘못된 값: ${issue2.origin}`;
      default:
        return `잘못된 입력`;
    }
  };
};
function ko() {
  return {
    localeError: error$j()
  };
}
const error$i = () => {
  const Sizable = {
    string: { unit: "знаци", verb: "да имаат" },
    file: { unit: "бајти", verb: "да имаат" },
    array: { unit: "ставки", verb: "да имаат" },
    set: { unit: "ставки", verb: "да имаат" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "број";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "низа";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "внес",
    email: "адреса на е-пошта",
    url: "URL",
    emoji: "емоџи",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO датум и време",
    date: "ISO датум",
    time: "ISO време",
    duration: "ISO времетраење",
    ipv4: "IPv4 адреса",
    ipv6: "IPv6 адреса",
    cidrv4: "IPv4 опсег",
    cidrv6: "IPv6 опсег",
    base64: "base64-енкодирана низа",
    base64url: "base64url-енкодирана низа",
    json_string: "JSON низа",
    e164: "E.164 број",
    jwt: "JWT",
    template_literal: "внес"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Грешен внес: се очекува ${issue2.expected}, примено ${parsedType2(issue2.input)}`;
      // return `Invalid input: expected ${issue.expected}, received ${util.getParsedType(issue.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `Грешана опција: се очекува една ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Премногу голем: се очекува ${issue2.origin ?? "вредноста"} да има ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елементи"}`;
        return `Премногу голем: се очекува ${issue2.origin ?? "вредноста"} да биде ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Премногу мал: се очекува ${issue2.origin} да има ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Премногу мал: се очекува ${issue2.origin} да биде ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Неважечка низа: мора да започнува со "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Неважечка низа: мора да завршува со "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неважечка низа: мора да вклучува "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неважечка низа: мора да одгоара на патернот ${_issue.pattern}`;
        return `Invalid ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Грешен број: мора да биде делив со ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Грешен клуч во ${issue2.origin}`;
      case "invalid_union":
        return "Грешен внес";
      case "invalid_element":
        return `Грешна вредност во ${issue2.origin}`;
      default:
        return `Грешен внес`;
    }
  };
};
function mk() {
  return {
    localeError: error$i()
  };
}
const error$h = () => {
  const Sizable = {
    string: { unit: "aksara", verb: "mempunyai" },
    file: { unit: "bait", verb: "mempunyai" },
    array: { unit: "elemen", verb: "mempunyai" },
    set: { unit: "elemen", verb: "mempunyai" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "nombor";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "input",
    email: "alamat e-mel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tarikh masa ISO",
    date: "tarikh ISO",
    time: "masa ISO",
    duration: "tempoh ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "julat IPv4",
    cidrv6: "julat IPv6",
    base64: "string dikodkan base64",
    base64url: "string dikodkan base64url",
    json_string: "string JSON",
    e164: "nombor E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Input tidak sah: dijangka ${issue2.expected}, diterima ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak sah: dijangka ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} adalah ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: dijangka ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: dijangka ${issue2.origin} adalah ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
        return `${Nouns[_issue.format] ?? issue2.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${issue2.origin}`;
      default:
        return `Input tidak sah`;
    }
  };
};
function ms() {
  return {
    localeError: error$h()
  };
}
const error$g = () => {
  const Sizable = {
    string: { unit: "tekens" },
    file: { unit: "bytes" },
    array: { unit: "elementen" },
    set: { unit: "elementen" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "getal";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "invoer",
    email: "emailadres",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum en tijd",
    date: "ISO datum",
    time: "ISO tijd",
    duration: "ISO duur",
    ipv4: "IPv4-adres",
    ipv6: "IPv6-adres",
    cidrv4: "IPv4-bereik",
    cidrv6: "IPv6-bereik",
    base64: "base64-gecodeerde tekst",
    base64url: "base64 URL-gecodeerde tekst",
    json_string: "JSON string",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "invoer"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Ongeldige invoer: verwacht ${issue2.expected}, ontving ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue2.values[0])}`;
        return `Ongeldige optie: verwacht één van ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Te lang: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementen"} bevat`;
        return `Te lang: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} is`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Te kort: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} bevat`;
        }
        return `Te kort: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} is`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
        }
        if (_issue.format === "ends_with")
          return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
        if (_issue.format === "includes")
          return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
        if (_issue.format === "regex")
          return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
        return `Ongeldig: ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${issue2.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${issue2.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${issue2.origin}`;
      default:
        return `Ongeldige invoer`;
    }
  };
};
function nl() {
  return {
    localeError: error$g()
  };
}
const error$f = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "å ha" },
    file: { unit: "bytes", verb: "å ha" },
    array: { unit: "elementer", verb: "å inneholde" },
    set: { unit: "elementer", verb: "å inneholde" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "tall";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "liste";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "input",
    email: "e-postadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkeslett",
    date: "ISO-dato",
    time: "ISO-klokkeslett",
    duration: "ISO-varighet",
    ipv4: "IPv4-område",
    ipv6: "IPv6-område",
    cidrv4: "IPv4-spekter",
    cidrv6: "IPv6-spekter",
    base64: "base64-enkodet streng",
    base64url: "base64url-enkodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Ugyldig input: forventet ${issue2.expected}, fikk ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig verdi: forventet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldig valg: forventet en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `For stor(t): forventet ${issue2.origin ?? "value"} til å ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor(t): forventet ${issue2.origin ?? "value"} til å ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `For lite(n): forventet ${issue2.origin} til å ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lite(n): forventet ${issue2.origin} til å ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: må starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: må ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: må inneholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
        return `Ugyldig ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: må være et multiplum av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøkkel i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${issue2.origin}`;
      default:
        return `Ugyldig input`;
    }
  };
};
function no() {
  return {
    localeError: error$f()
  };
}
const error$e = () => {
  const Sizable = {
    string: { unit: "harf", verb: "olmalıdır" },
    file: { unit: "bayt", verb: "olmalıdır" },
    array: { unit: "unsur", verb: "olmalıdır" },
    set: { unit: "unsur", verb: "olmalıdır" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "numara";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "saf";
        }
        if (data === null) {
          return "gayb";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "giren",
    email: "epostagâh",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO hengâmı",
    date: "ISO tarihi",
    time: "ISO zamanı",
    duration: "ISO müddeti",
    ipv4: "IPv4 nişânı",
    ipv6: "IPv6 nişânı",
    cidrv4: "IPv4 menzili",
    cidrv6: "IPv6 menzili",
    base64: "base64-şifreli metin",
    base64url: "base64url-şifreli metin",
    json_string: "JSON metin",
    e164: "E.164 sayısı",
    jwt: "JWT",
    template_literal: "giren"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Fâsit giren: umulan ${issue2.expected}, alınan ${parsedType2(issue2.input)}`;
      // return `Fâsit giren: umulan ${issue.expected}, alınan ${util.getParsedType(issue.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Fâsit giren: umulan ${stringifyPrimitive(issue2.values[0])}`;
        return `Fâsit tercih: mûteberler ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Fazla büyük: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmalıydı.`;
        return `Fazla büyük: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} olmalıydı.`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Fazla küçük: ${issue2.origin}, ${adj}${issue2.minimum.toString()} ${sizing.unit} sahip olmalıydı.`;
        }
        return `Fazla küçük: ${issue2.origin}, ${adj}${issue2.minimum.toString()} olmalıydı.`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Fâsit metin: "${_issue.prefix}" ile başlamalı.`;
        if (_issue.format === "ends_with")
          return `Fâsit metin: "${_issue.suffix}" ile bitmeli.`;
        if (_issue.format === "includes")
          return `Fâsit metin: "${_issue.includes}" ihtivâ etmeli.`;
        if (_issue.format === "regex")
          return `Fâsit metin: ${_issue.pattern} nakşına uymalı.`;
        return `Fâsit ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Fâsit sayı: ${issue2.divisor} katı olmalıydı.`;
      case "unrecognized_keys":
        return `Tanınmayan anahtar ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} için tanınmayan anahtar var.`;
      case "invalid_union":
        return "Giren tanınamadı.";
      case "invalid_element":
        return `${issue2.origin} için tanınmayan kıymet var.`;
      default:
        return `Kıymet tanınamadı.`;
    }
  };
};
function ota() {
  return {
    localeError: error$e()
  };
}
const error$d = () => {
  const Sizable = {
    string: { unit: "توکي", verb: "ولري" },
    file: { unit: "بایټس", verb: "ولري" },
    array: { unit: "توکي", verb: "ولري" },
    set: { unit: "توکي", verb: "ولري" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "عدد";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "ارې";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "ورودي",
    email: "بریښنالیک",
    url: "یو آر ال",
    emoji: "ایموجي",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "نیټه او وخت",
    date: "نېټه",
    time: "وخت",
    duration: "موده",
    ipv4: "د IPv4 پته",
    ipv6: "د IPv6 پته",
    cidrv4: "د IPv4 ساحه",
    cidrv6: "د IPv6 ساحه",
    base64: "base64-encoded متن",
    base64url: "base64url-encoded متن",
    json_string: "JSON متن",
    e164: "د E.164 شمېره",
    jwt: "JWT",
    template_literal: "ورودي"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `ناسم ورودي: باید ${issue2.expected} وای, مګر ${parsedType2(issue2.input)} ترلاسه شو`;
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `ناسم ورودي: باید ${stringifyPrimitive(issue2.values[0])} وای`;
        }
        return `ناسم انتخاب: باید یو له ${joinValues(issue2.values, "|")} څخه وای`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ډیر لوی: ${issue2.origin ?? "ارزښت"} باید ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عنصرونه"} ولري`;
        }
        return `ډیر لوی: ${issue2.origin ?? "ارزښت"} باید ${adj}${issue2.maximum.toString()} وي`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ډیر کوچنی: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} ${sizing.unit} ولري`;
        }
        return `ډیر کوچنی: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} وي`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `ناسم متن: باید د "${_issue.prefix}" سره پیل شي`;
        }
        if (_issue.format === "ends_with") {
          return `ناسم متن: باید د "${_issue.suffix}" سره پای ته ورسيږي`;
        }
        if (_issue.format === "includes") {
          return `ناسم متن: باید "${_issue.includes}" ولري`;
        }
        if (_issue.format === "regex") {
          return `ناسم متن: باید د ${_issue.pattern} سره مطابقت ولري`;
        }
        return `${Nouns[_issue.format] ?? issue2.format} ناسم دی`;
      }
      case "not_multiple_of":
        return `ناسم عدد: باید د ${issue2.divisor} مضرب وي`;
      case "unrecognized_keys":
        return `ناسم ${issue2.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `ناسم کلیډ په ${issue2.origin} کې`;
      case "invalid_union":
        return `ناسمه ورودي`;
      case "invalid_element":
        return `ناسم عنصر په ${issue2.origin} کې`;
      default:
        return `ناسمه ورودي`;
    }
  };
};
function ps() {
  return {
    localeError: error$d()
  };
}
const error$c = () => {
  const Sizable = {
    string: { unit: "znaków", verb: "mieć" },
    file: { unit: "bajtów", verb: "mieć" },
    array: { unit: "elementów", verb: "mieć" },
    set: { unit: "elementów", verb: "mieć" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "liczba";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "tablica";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "wyrażenie",
    email: "adres email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i godzina w formacie ISO",
    date: "data w formacie ISO",
    time: "godzina w formacie ISO",
    duration: "czas trwania ISO",
    ipv4: "adres IPv4",
    ipv6: "adres IPv6",
    cidrv4: "zakres IPv4",
    cidrv6: "zakres IPv6",
    base64: "ciąg znaków zakodowany w formacie base64",
    base64url: "ciąg znaków zakodowany w formacie base64url",
    json_string: "ciąg znaków w formacie JSON",
    e164: "liczba E.164",
    jwt: "JWT",
    template_literal: "wejście"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Nieprawidłowe dane wejściowe: oczekiwano ${issue2.expected}, otrzymano ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nieprawidłowe dane wejściowe: oczekiwano ${stringifyPrimitive(issue2.values[0])}`;
        return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za duża wartość: oczekiwano, że ${issue2.origin ?? "wartość"} będzie mieć ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementów"}`;
        }
        return `Zbyt duż(y/a/e): oczekiwano, że ${issue2.origin ?? "wartość"} będzie wynosić ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za mała wartość: oczekiwano, że ${issue2.origin ?? "wartość"} będzie mieć ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "elementów"}`;
        }
        return `Zbyt mał(y/a/e): oczekiwano, że ${issue2.origin ?? "wartość"} będzie wynosić ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nieprawidłowy ciąg znaków: musi zaczynać się od "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nieprawidłowy ciąg znaków: musi kończyć się na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nieprawidłowy ciąg znaków: musi zawierać "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${_issue.pattern}`;
        return `Nieprawidłow(y/a/e) ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nieprawidłowa liczba: musi być wielokrotnością ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawidłowy klucz w ${issue2.origin}`;
      case "invalid_union":
        return "Nieprawidłowe dane wejściowe";
      case "invalid_element":
        return `Nieprawidłowa wartość w ${issue2.origin}`;
      default:
        return `Nieprawidłowe dane wejściowe`;
    }
  };
};
function pl() {
  return {
    localeError: error$c()
  };
}
const error$b = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "ter" },
    file: { unit: "bytes", verb: "ter" },
    array: { unit: "itens", verb: "ter" },
    set: { unit: "itens", verb: "ter" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "número";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "nulo";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "padrão",
    email: "endereço de e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "duração ISO",
    ipv4: "endereço IPv4",
    ipv6: "endereço IPv6",
    cidrv4: "faixa de IPv4",
    cidrv6: "faixa de IPv6",
    base64: "texto codificado em base64",
    base64url: "URL codificada em base64",
    json_string: "texto JSON",
    e164: "número E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Tipo inválido: esperado ${issue2.expected}, recebido ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inválida: esperado ${stringifyPrimitive(issue2.values[0])}`;
        return `Opção inválida: esperada uma das ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Muito grande: esperado que ${issue2.origin ?? "valor"} tivesse ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Muito grande: esperado que ${issue2.origin ?? "valor"} fosse ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Muito pequeno: esperado que ${issue2.origin} tivesse ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Muito pequeno: esperado que ${issue2.origin} fosse ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Texto inválido: deve começar com "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Texto inválido: deve terminar com "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Texto inválido: deve incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
        return `${Nouns[_issue.format] ?? issue2.format} inválido`;
      }
      case "not_multiple_of":
        return `Número inválido: deve ser múltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chave${issue2.keys.length > 1 ? "s" : ""} desconhecida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chave inválida em ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inválida";
      case "invalid_element":
        return `Valor inválido em ${issue2.origin}`;
      default:
        return `Campo inválido`;
    }
  };
};
function pt() {
  return {
    localeError: error$b()
  };
}
function getRussianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
const error$a = () => {
  const Sizable = {
    string: {
      unit: {
        one: "символ",
        few: "символа",
        many: "символов"
      },
      verb: "иметь"
    },
    file: {
      unit: {
        one: "байт",
        few: "байта",
        many: "байт"
      },
      verb: "иметь"
    },
    array: {
      unit: {
        one: "элемент",
        few: "элемента",
        many: "элементов"
      },
      verb: "иметь"
    },
    set: {
      unit: {
        one: "элемент",
        few: "элемента",
        many: "элементов"
      },
      verb: "иметь"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "число";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "массив";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "ввод",
    email: "email адрес",
    url: "URL",
    emoji: "эмодзи",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO дата и время",
    date: "ISO дата",
    time: "ISO время",
    duration: "ISO длительность",
    ipv4: "IPv4 адрес",
    ipv6: "IPv6 адрес",
    cidrv4: "IPv4 диапазон",
    cidrv6: "IPv6 диапазон",
    base64: "строка в формате base64",
    base64url: "строка в формате base64url",
    json_string: "JSON строка",
    e164: "номер E.164",
    jwt: "JWT",
    template_literal: "ввод"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Неверный ввод: ожидалось ${issue2.expected}, получено ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Неверный ввод: ожидалось ${stringifyPrimitive(issue2.values[0])}`;
        return `Неверный вариант: ожидалось одно из ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Слишком большое значение: ожидалось, что ${issue2.origin ?? "значение"} будет иметь ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `Слишком большое значение: ожидалось, что ${issue2.origin ?? "значение"} будет ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Слишком маленькое значение: ожидалось, что ${issue2.origin} будет иметь ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `Слишком маленькое значение: ожидалось, что ${issue2.origin} будет ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Неверная строка: должна начинаться с "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Неверная строка: должна заканчиваться на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неверная строка: должна содержать "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неверная строка: должна соответствовать шаблону ${_issue.pattern}`;
        return `Неверный ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Неверное число: должно быть кратным ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Нераспознанн${issue2.keys.length > 1 ? "ые" : "ый"} ключ${issue2.keys.length > 1 ? "и" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Неверный ключ в ${issue2.origin}`;
      case "invalid_union":
        return "Неверные входные данные";
      case "invalid_element":
        return `Неверное значение в ${issue2.origin}`;
      default:
        return `Неверные входные данные`;
    }
  };
};
function ru() {
  return {
    localeError: error$a()
  };
}
const error$9 = () => {
  const Sizable = {
    string: { unit: "znakov", verb: "imeti" },
    file: { unit: "bajtov", verb: "imeti" },
    array: { unit: "elementov", verb: "imeti" },
    set: { unit: "elementov", verb: "imeti" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "število";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "tabela";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "vnos",
    email: "e-poštni naslov",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum in čas",
    date: "ISO datum",
    time: "ISO čas",
    duration: "ISO trajanje",
    ipv4: "IPv4 naslov",
    ipv6: "IPv6 naslov",
    cidrv4: "obseg IPv4",
    cidrv6: "obseg IPv6",
    base64: "base64 kodiran niz",
    base64url: "base64url kodiran niz",
    json_string: "JSON niz",
    e164: "E.164 številka",
    jwt: "JWT",
    template_literal: "vnos"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Neveljaven vnos: pričakovano ${issue2.expected}, prejeto ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neveljaven vnos: pričakovano ${stringifyPrimitive(issue2.values[0])}`;
        return `Neveljavna možnost: pričakovano eno izmed ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Preveliko: pričakovano, da bo ${issue2.origin ?? "vrednost"} imelo ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementov"}`;
        return `Preveliko: pričakovano, da bo ${issue2.origin ?? "vrednost"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Premajhno: pričakovano, da bo ${issue2.origin} imelo ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Premajhno: pričakovano, da bo ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Neveljaven niz: mora se začeti z "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Neveljaven niz: mora se končati z "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
        return `Neveljaven ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno število: mora biti večkratnik ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${issue2.keys.length > 1 ? "i ključi" : " ključ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven ključ v ${issue2.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${issue2.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function sl() {
  return {
    localeError: error$9()
  };
}
const error$8 = () => {
  const Sizable = {
    string: { unit: "tecken", verb: "att ha" },
    file: { unit: "bytes", verb: "att ha" },
    array: { unit: "objekt", verb: "att innehålla" },
    set: { unit: "objekt", verb: "att innehålla" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "antal";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "lista";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "reguljärt uttryck",
    email: "e-postadress",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datum och tid",
    date: "ISO-datum",
    time: "ISO-tid",
    duration: "ISO-varaktighet",
    ipv4: "IPv4-intervall",
    ipv6: "IPv6-intervall",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodad sträng",
    base64url: "base64url-kodad sträng",
    json_string: "JSON-sträng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "mall-literal"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Ogiltig inmatning: förväntat ${issue2.expected}, fick ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ogiltig inmatning: förväntat ${stringifyPrimitive(issue2.values[0])}`;
        return `Ogiltigt val: förväntade en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `För stor(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        }
        return `För stor(t): förväntat ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `För lite(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `För lite(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ogiltig sträng: måste börja med "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ogiltig sträng: måste sluta med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ogiltig sträng: måste innehålla "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ogiltig sträng: måste matcha mönstret "${_issue.pattern}"`;
        return `Ogiltig(t) ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: måste vara en multipel av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${issue2.origin ?? "värdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt värde i ${issue2.origin ?? "värdet"}`;
      default:
        return `Ogiltig input`;
    }
  };
};
function sv() {
  return {
    localeError: error$8()
  };
}
const error$7 = () => {
  const Sizable = {
    string: { unit: "எழுத்துக்கள்", verb: "கொண்டிருக்க வேண்டும்" },
    file: { unit: "பைட்டுகள்", verb: "கொண்டிருக்க வேண்டும்" },
    array: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
    set: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "எண் அல்லாதது" : "எண்";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "அணி";
        }
        if (data === null) {
          return "வெறுமை";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "உள்ளீடு",
    email: "மின்னஞ்சல் முகவரி",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO தேதி நேரம்",
    date: "ISO தேதி",
    time: "ISO நேரம்",
    duration: "ISO கால அளவு",
    ipv4: "IPv4 முகவரி",
    ipv6: "IPv6 முகவரி",
    cidrv4: "IPv4 வரம்பு",
    cidrv6: "IPv6 வரம்பு",
    base64: "base64-encoded சரம்",
    base64url: "base64url-encoded சரம்",
    json_string: "JSON சரம்",
    e164: "E.164 எண்",
    jwt: "JWT",
    template_literal: "input"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${issue2.expected}, பெறப்பட்டது ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${stringifyPrimitive(issue2.values[0])}`;
        return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${joinValues(issue2.values, "|")} இல் ஒன்று`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue2.origin ?? "மதிப்பு"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
        }
        return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue2.origin ?? "மதிப்பு"} ${adj}${issue2.maximum.toString()} ஆக இருக்க வேண்டும்`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ஆக இருக்க வேண்டும்`;
        }
        return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue2.origin} ${adj}${issue2.minimum.toString()} ஆக இருக்க வேண்டும்`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `தவறான சரம்: "${_issue.prefix}" இல் தொடங்க வேண்டும்`;
        if (_issue.format === "ends_with")
          return `தவறான சரம்: "${_issue.suffix}" இல் முடிவடைய வேண்டும்`;
        if (_issue.format === "includes")
          return `தவறான சரம்: "${_issue.includes}" ஐ உள்ளடக்க வேண்டும்`;
        if (_issue.format === "regex")
          return `தவறான சரம்: ${_issue.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
        return `தவறான ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `தவறான எண்: ${issue2.divisor} இன் பலமாக இருக்க வேண்டும்`;
      case "unrecognized_keys":
        return `அடையாளம் தெரியாத விசை${issue2.keys.length > 1 ? "கள்" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} இல் தவறான விசை`;
      case "invalid_union":
        return "தவறான உள்ளீடு";
      case "invalid_element":
        return `${issue2.origin} இல் தவறான மதிப்பு`;
      default:
        return `தவறான உள்ளீடு`;
    }
  };
};
function ta() {
  return {
    localeError: error$7()
  };
}
const error$6 = () => {
  const Sizable = {
    string: { unit: "ตัวอักษร", verb: "ควรมี" },
    file: { unit: "ไบต์", verb: "ควรมี" },
    array: { unit: "รายการ", verb: "ควรมี" },
    set: { unit: "รายการ", verb: "ควรมี" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "ไม่ใช่ตัวเลข (NaN)" : "ตัวเลข";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "อาร์เรย์ (Array)";
        }
        if (data === null) {
          return "ไม่มีค่า (null)";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "ข้อมูลที่ป้อน",
    email: "ที่อยู่อีเมล",
    url: "URL",
    emoji: "อิโมจิ",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "วันที่เวลาแบบ ISO",
    date: "วันที่แบบ ISO",
    time: "เวลาแบบ ISO",
    duration: "ช่วงเวลาแบบ ISO",
    ipv4: "ที่อยู่ IPv4",
    ipv6: "ที่อยู่ IPv6",
    cidrv4: "ช่วง IP แบบ IPv4",
    cidrv6: "ช่วง IP แบบ IPv6",
    base64: "ข้อความแบบ Base64",
    base64url: "ข้อความแบบ Base64 สำหรับ URL",
    json_string: "ข้อความแบบ JSON",
    e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
    jwt: "โทเคน JWT",
    template_literal: "ข้อมูลที่ป้อน"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${issue2.expected} แต่ได้รับ ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `ค่าไม่ถูกต้อง: ควรเป็น ${stringifyPrimitive(issue2.values[0])}`;
        return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "ไม่เกิน" : "น้อยกว่า";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `เกินกำหนด: ${issue2.origin ?? "ค่า"} ควรมี${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "รายการ"}`;
        return `เกินกำหนด: ${issue2.origin ?? "ค่า"} ควรมี${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "อย่างน้อย" : "มากกว่า";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `น้อยกว่ากำหนด: ${issue2.origin} ควรมี${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `น้อยกว่ากำหนด: ${issue2.origin} ควรมี${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${_issue.includes}" อยู่ในข้อความ`;
        if (_issue.format === "regex")
          return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${_issue.pattern}`;
        return `รูปแบบไม่ถูกต้อง: ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${issue2.divisor} ได้ลงตัว`;
      case "unrecognized_keys":
        return `พบคีย์ที่ไม่รู้จัก: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `คีย์ไม่ถูกต้องใน ${issue2.origin}`;
      case "invalid_union":
        return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
      case "invalid_element":
        return `ข้อมูลไม่ถูกต้องใน ${issue2.origin}`;
      default:
        return `ข้อมูลไม่ถูกต้อง`;
    }
  };
};
function th() {
  return {
    localeError: error$6()
  };
}
const parsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "NaN" : "number";
    }
    case "object": {
      if (Array.isArray(data)) {
        return "array";
      }
      if (data === null) {
        return "null";
      }
      if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
        return data.constructor.name;
      }
    }
  }
  return t;
};
const error$5 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "olmalı" },
    file: { unit: "bayt", verb: "olmalı" },
    array: { unit: "öğe", verb: "olmalı" },
    set: { unit: "öğe", verb: "olmalı" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const Nouns = {
    regex: "girdi",
    email: "e-posta adresi",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO tarih ve saat",
    date: "ISO tarih",
    time: "ISO saat",
    duration: "ISO süre",
    ipv4: "IPv4 adresi",
    ipv6: "IPv6 adresi",
    cidrv4: "IPv4 aralığı",
    cidrv6: "IPv6 aralığı",
    base64: "base64 ile şifrelenmiş metin",
    base64url: "base64url ile şifrelenmiş metin",
    json_string: "JSON dizesi",
    e164: "E.164 sayısı",
    jwt: "JWT",
    template_literal: "Şablon dizesi"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Geçersiz değer: beklenen ${issue2.expected}, alınan ${parsedType(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Geçersiz değer: beklenen ${stringifyPrimitive(issue2.values[0])}`;
        return `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çok büyük: beklenen ${issue2.origin ?? "değer"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "öğe"}`;
        return `Çok büyük: beklenen ${issue2.origin ?? "değer"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çok küçük: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `Çok küçük: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Geçersiz metin: "${_issue.prefix}" ile başlamalı`;
        if (_issue.format === "ends_with")
          return `Geçersiz metin: "${_issue.suffix}" ile bitmeli`;
        if (_issue.format === "includes")
          return `Geçersiz metin: "${_issue.includes}" içermeli`;
        if (_issue.format === "regex")
          return `Geçersiz metin: ${_issue.pattern} desenine uymalı`;
        return `Geçersiz ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Geçersiz sayı: ${issue2.divisor} ile tam bölünebilmeli`;
      case "unrecognized_keys":
        return `Tanınmayan anahtar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} içinde geçersiz anahtar`;
      case "invalid_union":
        return "Geçersiz değer";
      case "invalid_element":
        return `${issue2.origin} içinde geçersiz değer`;
      default:
        return `Geçersiz değer`;
    }
  };
};
function tr() {
  return {
    localeError: error$5()
  };
}
const error$4 = () => {
  const Sizable = {
    string: { unit: "символів", verb: "матиме" },
    file: { unit: "байтів", verb: "матиме" },
    array: { unit: "елементів", verb: "матиме" },
    set: { unit: "елементів", verb: "матиме" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "число";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "масив";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "вхідні дані",
    email: "адреса електронної пошти",
    url: "URL",
    emoji: "емодзі",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "дата та час ISO",
    date: "дата ISO",
    time: "час ISO",
    duration: "тривалість ISO",
    ipv4: "адреса IPv4",
    ipv6: "адреса IPv6",
    cidrv4: "діапазон IPv4",
    cidrv6: "діапазон IPv6",
    base64: "рядок у кодуванні base64",
    base64url: "рядок у кодуванні base64url",
    json_string: "рядок JSON",
    e164: "номер E.164",
    jwt: "JWT",
    template_literal: "вхідні дані"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Неправильні вхідні дані: очікується ${issue2.expected}, отримано ${parsedType2(issue2.input)}`;
      // return `Неправильні вхідні дані: очікується ${issue.expected}, отримано ${util.getParsedType(issue.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Неправильні вхідні дані: очікується ${stringifyPrimitive(issue2.values[0])}`;
        return `Неправильна опція: очікується одне з ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Занадто велике: очікується, що ${issue2.origin ?? "значення"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елементів"}`;
        return `Занадто велике: очікується, що ${issue2.origin ?? "значення"} буде ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Занадто мале: очікується, що ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Занадто мале: очікується, що ${issue2.origin} буде ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Неправильний рядок: повинен починатися з "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Неправильний рядок: повинен закінчуватися на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неправильний рядок: повинен містити "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неправильний рядок: повинен відповідати шаблону ${_issue.pattern}`;
        return `Неправильний ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Неправильне число: повинно бути кратним ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Нерозпізнаний ключ${issue2.keys.length > 1 ? "і" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Неправильний ключ у ${issue2.origin}`;
      case "invalid_union":
        return "Неправильні вхідні дані";
      case "invalid_element":
        return `Неправильне значення у ${issue2.origin}`;
      default:
        return `Неправильні вхідні дані`;
    }
  };
};
function ua() {
  return {
    localeError: error$4()
  };
}
const error$3 = () => {
  const Sizable = {
    string: { unit: "حروف", verb: "ہونا" },
    file: { unit: "بائٹس", verb: "ہونا" },
    array: { unit: "آئٹمز", verb: "ہونا" },
    set: { unit: "آئٹمز", verb: "ہونا" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "نمبر";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "آرے";
        }
        if (data === null) {
          return "نل";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "ان پٹ",
    email: "ای میل ایڈریس",
    url: "یو آر ایل",
    emoji: "ایموجی",
    uuid: "یو یو آئی ڈی",
    uuidv4: "یو یو آئی ڈی وی 4",
    uuidv6: "یو یو آئی ڈی وی 6",
    nanoid: "نینو آئی ڈی",
    guid: "جی یو آئی ڈی",
    cuid: "سی یو آئی ڈی",
    cuid2: "سی یو آئی ڈی 2",
    ulid: "یو ایل آئی ڈی",
    xid: "ایکس آئی ڈی",
    ksuid: "کے ایس یو آئی ڈی",
    datetime: "آئی ایس او ڈیٹ ٹائم",
    date: "آئی ایس او تاریخ",
    time: "آئی ایس او وقت",
    duration: "آئی ایس او مدت",
    ipv4: "آئی پی وی 4 ایڈریس",
    ipv6: "آئی پی وی 6 ایڈریس",
    cidrv4: "آئی پی وی 4 رینج",
    cidrv6: "آئی پی وی 6 رینج",
    base64: "بیس 64 ان کوڈڈ سٹرنگ",
    base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
    json_string: "جے ایس او این سٹرنگ",
    e164: "ای 164 نمبر",
    jwt: "جے ڈبلیو ٹی",
    template_literal: "ان پٹ"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `غلط ان پٹ: ${issue2.expected} متوقع تھا، ${parsedType2(issue2.input)} موصول ہوا`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `غلط ان پٹ: ${stringifyPrimitive(issue2.values[0])} متوقع تھا`;
        return `غلط آپشن: ${joinValues(issue2.values, "|")} میں سے ایک متوقع تھا`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `بہت بڑا: ${issue2.origin ?? "ویلیو"} کے ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عناصر"} ہونے متوقع تھے`;
        return `بہت بڑا: ${issue2.origin ?? "ویلیو"} کا ${adj}${issue2.maximum.toString()} ہونا متوقع تھا`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `بہت چھوٹا: ${issue2.origin} کے ${adj}${issue2.minimum.toString()} ${sizing.unit} ہونے متوقع تھے`;
        }
        return `بہت چھوٹا: ${issue2.origin} کا ${adj}${issue2.minimum.toString()} ہونا متوقع تھا`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `غلط سٹرنگ: "${_issue.prefix}" سے شروع ہونا چاہیے`;
        }
        if (_issue.format === "ends_with")
          return `غلط سٹرنگ: "${_issue.suffix}" پر ختم ہونا چاہیے`;
        if (_issue.format === "includes")
          return `غلط سٹرنگ: "${_issue.includes}" شامل ہونا چاہیے`;
        if (_issue.format === "regex")
          return `غلط سٹرنگ: پیٹرن ${_issue.pattern} سے میچ ہونا چاہیے`;
        return `غلط ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `غلط نمبر: ${issue2.divisor} کا مضاعف ہونا چاہیے`;
      case "unrecognized_keys":
        return `غیر تسلیم شدہ کی${issue2.keys.length > 1 ? "ز" : ""}: ${joinValues(issue2.keys, "، ")}`;
      case "invalid_key":
        return `${issue2.origin} میں غلط کی`;
      case "invalid_union":
        return "غلط ان پٹ";
      case "invalid_element":
        return `${issue2.origin} میں غلط ویلیو`;
      default:
        return `غلط ان پٹ`;
    }
  };
};
function ur() {
  return {
    localeError: error$3()
  };
}
const error$2 = () => {
  const Sizable = {
    string: { unit: "ký tự", verb: "có" },
    file: { unit: "byte", verb: "có" },
    array: { unit: "phần tử", verb: "có" },
    set: { unit: "phần tử", verb: "có" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "số";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "mảng";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "đầu vào",
    email: "địa chỉ email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ngày giờ ISO",
    date: "ngày ISO",
    time: "giờ ISO",
    duration: "khoảng thời gian ISO",
    ipv4: "địa chỉ IPv4",
    ipv6: "địa chỉ IPv6",
    cidrv4: "dải IPv4",
    cidrv6: "dải IPv6",
    base64: "chuỗi mã hóa base64",
    base64url: "chuỗi mã hóa base64url",
    json_string: "chuỗi JSON",
    e164: "số E.164",
    jwt: "JWT",
    template_literal: "đầu vào"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `Đầu vào không hợp lệ: mong đợi ${issue2.expected}, nhận được ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Đầu vào không hợp lệ: mong đợi ${stringifyPrimitive(issue2.values[0])}`;
        return `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Quá lớn: mong đợi ${issue2.origin ?? "giá trị"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "phần tử"}`;
        return `Quá lớn: mong đợi ${issue2.origin ?? "giá trị"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Quá nhỏ: mong đợi ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Quá nhỏ: mong đợi ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Chuỗi không hợp lệ: phải bắt đầu bằng "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chuỗi không hợp lệ: phải kết thúc bằng "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chuỗi không hợp lệ: phải bao gồm "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chuỗi không hợp lệ: phải khớp với mẫu ${_issue.pattern}`;
        return `${Nouns[_issue.format] ?? issue2.format} không hợp lệ`;
      }
      case "not_multiple_of":
        return `Số không hợp lệ: phải là bội số của ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Khóa không được nhận dạng: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Khóa không hợp lệ trong ${issue2.origin}`;
      case "invalid_union":
        return "Đầu vào không hợp lệ";
      case "invalid_element":
        return `Giá trị không hợp lệ trong ${issue2.origin}`;
      default:
        return `Đầu vào không hợp lệ`;
    }
  };
};
function vi() {
  return {
    localeError: error$2()
  };
}
const error$1 = () => {
  const Sizable = {
    string: { unit: "字符", verb: "包含" },
    file: { unit: "字节", verb: "包含" },
    array: { unit: "项", verb: "包含" },
    set: { unit: "项", verb: "包含" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "非数字(NaN)" : "数字";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "数组";
        }
        if (data === null) {
          return "空值(null)";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "输入",
    email: "电子邮件",
    url: "URL",
    emoji: "表情符号",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO日期时间",
    date: "ISO日期",
    time: "ISO时间",
    duration: "ISO时长",
    ipv4: "IPv4地址",
    ipv6: "IPv6地址",
    cidrv4: "IPv4网段",
    cidrv6: "IPv6网段",
    base64: "base64编码字符串",
    base64url: "base64url编码字符串",
    json_string: "JSON字符串",
    e164: "E.164号码",
    jwt: "JWT",
    template_literal: "输入"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `无效输入：期望 ${issue2.expected}，实际接收 ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `无效输入：期望 ${stringifyPrimitive(issue2.values[0])}`;
        return `无效选项：期望以下之一 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `数值过大：期望 ${issue2.origin ?? "值"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "个元素"}`;
        return `数值过大：期望 ${issue2.origin ?? "值"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `数值过小：期望 ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `数值过小：期望 ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `无效字符串：必须以 "${_issue.prefix}" 开头`;
        if (_issue.format === "ends_with")
          return `无效字符串：必须以 "${_issue.suffix}" 结尾`;
        if (_issue.format === "includes")
          return `无效字符串：必须包含 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `无效字符串：必须满足正则表达式 ${_issue.pattern}`;
        return `无效${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `无效数字：必须是 ${issue2.divisor} 的倍数`;
      case "unrecognized_keys":
        return `出现未知的键(key): ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} 中的键(key)无效`;
      case "invalid_union":
        return "无效输入";
      case "invalid_element":
        return `${issue2.origin} 中包含无效值(value)`;
      default:
        return `无效输入`;
    }
  };
};
function zhCN() {
  return {
    localeError: error$1()
  };
}
const error = () => {
  const Sizable = {
    string: { unit: "字元", verb: "擁有" },
    file: { unit: "位元組", verb: "擁有" },
    array: { unit: "項目", verb: "擁有" },
    set: { unit: "項目", verb: "擁有" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const parsedType2 = (data) => {
    const t = typeof data;
    switch (t) {
      case "number": {
        return Number.isNaN(data) ? "NaN" : "number";
      }
      case "object": {
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "null";
        }
        if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) {
          return data.constructor.name;
        }
      }
    }
    return t;
  };
  const Nouns = {
    regex: "輸入",
    email: "郵件地址",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO 日期時間",
    date: "ISO 日期",
    time: "ISO 時間",
    duration: "ISO 期間",
    ipv4: "IPv4 位址",
    ipv6: "IPv6 位址",
    cidrv4: "IPv4 範圍",
    cidrv6: "IPv6 範圍",
    base64: "base64 編碼字串",
    base64url: "base64url 編碼字串",
    json_string: "JSON 字串",
    e164: "E.164 數值",
    jwt: "JWT",
    template_literal: "輸入"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type":
        return `無效的輸入值：預期為 ${issue2.expected}，但收到 ${parsedType2(issue2.input)}`;
      case "invalid_value":
        if (issue2.values.length === 1)
          return `無效的輸入值：預期為 ${stringifyPrimitive(issue2.values[0])}`;
        return `無效的選項：預期為以下其中之一 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `數值過大：預期 ${issue2.origin ?? "值"} 應為 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "個元素"}`;
        return `數值過大：預期 ${issue2.origin ?? "值"} 應為 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `數值過小：預期 ${issue2.origin} 應為 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `數值過小：預期 ${issue2.origin} 應為 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `無效的字串：必須以 "${_issue.prefix}" 開頭`;
        }
        if (_issue.format === "ends_with")
          return `無效的字串：必須以 "${_issue.suffix}" 結尾`;
        if (_issue.format === "includes")
          return `無效的字串：必須包含 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `無效的字串：必須符合格式 ${_issue.pattern}`;
        return `無效的 ${Nouns[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `無效的數字：必須為 ${issue2.divisor} 的倍數`;
      case "unrecognized_keys":
        return `無法識別的鍵值${issue2.keys.length > 1 ? "們" : ""}：${joinValues(issue2.keys, "、")}`;
      case "invalid_key":
        return `${issue2.origin} 中有無效的鍵值`;
      case "invalid_union":
        return "無效的輸入值";
      case "invalid_element":
        return `${issue2.origin} 中有無效的值`;
      default:
        return `無效的輸入值`;
    }
  };
};
function zhTW() {
  return {
    localeError: error()
  };
}
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ar,
  az,
  be,
  ca,
  cs,
  de,
  en,
  eo,
  es,
  fa,
  fi,
  fr,
  frCA,
  he,
  hu,
  id,
  it,
  ja,
  kh,
  ko,
  mk,
  ms,
  nl,
  no,
  ota,
  pl,
  ps,
  pt,
  ru,
  sl,
  sv,
  ta,
  th,
  tr,
  ua,
  ur,
  vi,
  zhCN,
  zhTW
}, Symbol.toStringTag, { value: "Module" }));
const $output = /* @__PURE__ */ Symbol("ZodOutput");
const $input = /* @__PURE__ */ Symbol("ZodInput");
class $ZodRegistry {
  constructor() {
    this._map = /* @__PURE__ */ new Map();
    this._idmap = /* @__PURE__ */ new Map();
  }
  add(schema2, ..._meta) {
    const meta = _meta[0];
    this._map.set(schema2, meta);
    if (meta && typeof meta === "object" && "id" in meta) {
      if (this._idmap.has(meta.id)) {
        throw new Error(`ID ${meta.id} already exists in the registry`);
      }
      this._idmap.set(meta.id, schema2);
    }
    return this;
  }
  clear() {
    this._map = /* @__PURE__ */ new Map();
    this._idmap = /* @__PURE__ */ new Map();
    return this;
  }
  remove(schema2) {
    const meta = this._map.get(schema2);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.delete(meta.id);
    }
    this._map.delete(schema2);
    return this;
  }
  get(schema2) {
    const p = schema2._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      return { ...pm, ...this._map.get(schema2) };
    }
    return this._map.get(schema2);
  }
  has(schema2) {
    return this._map.has(schema2);
  }
}
function registry() {
  return new $ZodRegistry();
}
const globalRegistry = /* @__PURE__ */ registry();
function _string(Class2, params) {
  return new Class2({
    type: "string",
    ...normalizeParams(params)
  });
}
function _coercedString(Class2, params) {
  return new Class2({
    type: "string",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _email(Class2, params) {
  return new Class2({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _guid(Class2, params) {
  return new Class2({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuidv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
function _uuidv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
function _uuidv7(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
function _url(Class2, params) {
  return new Class2({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _emoji(Class2, params) {
  return new Class2({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _nanoid(Class2, params) {
  return new Class2({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid2(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ulid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _xid(Class2, params) {
  return new Class2({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ksuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64url(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _e164(Class2, params) {
  return new Class2({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _jwt(Class2, params) {
  return new Class2({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
const TimePrecision = {
  Any: null,
  Minute: -1,
  Second: 0,
  Millisecond: 3,
  Microsecond: 6
};
function _isoDateTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDate(Class2, params) {
  return new Class2({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _isoTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDuration(Class2, params) {
  return new Class2({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _number(Class2, params) {
  return new Class2({
    type: "number",
    checks: [],
    ...normalizeParams(params)
  });
}
function _coercedNumber(Class2, params) {
  return new Class2({
    type: "number",
    coerce: true,
    checks: [],
    ...normalizeParams(params)
  });
}
function _int(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
function _float32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float32",
    ...normalizeParams(params)
  });
}
function _float64(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float64",
    ...normalizeParams(params)
  });
}
function _int32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "int32",
    ...normalizeParams(params)
  });
}
function _uint32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "uint32",
    ...normalizeParams(params)
  });
}
function _boolean(Class2, params) {
  return new Class2({
    type: "boolean",
    ...normalizeParams(params)
  });
}
function _coercedBoolean(Class2, params) {
  return new Class2({
    type: "boolean",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _bigint(Class2, params) {
  return new Class2({
    type: "bigint",
    ...normalizeParams(params)
  });
}
function _coercedBigint(Class2, params) {
  return new Class2({
    type: "bigint",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _int64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "int64",
    ...normalizeParams(params)
  });
}
function _uint64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "uint64",
    ...normalizeParams(params)
  });
}
function _symbol(Class2, params) {
  return new Class2({
    type: "symbol",
    ...normalizeParams(params)
  });
}
function _undefined$1(Class2, params) {
  return new Class2({
    type: "undefined",
    ...normalizeParams(params)
  });
}
function _null$1(Class2, params) {
  return new Class2({
    type: "null",
    ...normalizeParams(params)
  });
}
function _any(Class2) {
  return new Class2({
    type: "any"
  });
}
function _unknown(Class2) {
  return new Class2({
    type: "unknown"
  });
}
function _never(Class2, params) {
  return new Class2({
    type: "never",
    ...normalizeParams(params)
  });
}
function _void$1(Class2, params) {
  return new Class2({
    type: "void",
    ...normalizeParams(params)
  });
}
function _date(Class2, params) {
  return new Class2({
    type: "date",
    ...normalizeParams(params)
  });
}
function _coercedDate(Class2, params) {
  return new Class2({
    type: "date",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _nan(Class2, params) {
  return new Class2({
    type: "nan",
    ...normalizeParams(params)
  });
}
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _positive(params) {
  return _gt(0, params);
}
function _negative(params) {
  return _lt(0, params);
}
function _nonpositive(params) {
  return _lte(0, params);
}
function _nonnegative(params) {
  return _gte(0, params);
}
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
function _maxSize(maximum, params) {
  return new $ZodCheckMaxSize({
    check: "max_size",
    ...normalizeParams(params),
    maximum
  });
}
function _minSize(minimum, params) {
  return new $ZodCheckMinSize({
    check: "min_size",
    ...normalizeParams(params),
    minimum
  });
}
function _size(size, params) {
  return new $ZodCheckSizeEquals({
    check: "size_equals",
    ...normalizeParams(params),
    size
  });
}
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
function _property(property, schema2, params) {
  return new $ZodCheckProperty({
    check: "property",
    property,
    schema: schema2,
    ...normalizeParams(params)
  });
}
function _mime(types2, params) {
  return new $ZodCheckMimeType({
    check: "mime_type",
    mime: types2,
    ...normalizeParams(params)
  });
}
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
function _normalize(form) {
  return _overwrite((input) => input.normalize(form));
}
function _trim() {
  return _overwrite((input) => input.trim());
}
function _toLowerCase() {
  return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
  return _overwrite((input) => input.toUpperCase());
}
function _array(Class2, element, params) {
  return new Class2({
    type: "array",
    element,
    // get element() {
    //   return element;
    // },
    ...normalizeParams(params)
  });
}
function _union(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
function _discriminatedUnion(Class2, discriminator, options, params) {
  return new Class2({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
function _intersection(Class2, left, right) {
  return new Class2({
    type: "intersection",
    left,
    right
  });
}
function _tuple(Class2, items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new Class2({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
  });
}
function _record(Class2, keyType, valueType, params) {
  return new Class2({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function _map(Class2, keyType, valueType, params) {
  return new Class2({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function _set(Class2, valueType, params) {
  return new Class2({
    type: "set",
    valueType,
    ...normalizeParams(params)
  });
}
function _enum$1(Class2, values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function _nativeEnum(Class2, entries, params) {
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function _literal(Class2, value, params) {
  return new Class2({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
function _file(Class2, params) {
  return new Class2({
    type: "file",
    ...normalizeParams(params)
  });
}
function _transform(Class2, fn) {
  return new Class2({
    type: "transform",
    transform: fn
  });
}
function _optional(Class2, innerType) {
  return new Class2({
    type: "optional",
    innerType
  });
}
function _nullable(Class2, innerType) {
  return new Class2({
    type: "nullable",
    innerType
  });
}
function _default$1(Class2, innerType, defaultValue) {
  return new Class2({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
  });
}
function _nonoptional(Class2, innerType, params) {
  return new Class2({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
function _success(Class2, innerType) {
  return new Class2({
    type: "success",
    innerType
  });
}
function _catch$1(Class2, innerType, catchValue) {
  return new Class2({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
function _pipe(Class2, in_, out) {
  return new Class2({
    type: "pipe",
    in: in_,
    out
  });
}
function _readonly(Class2, innerType) {
  return new Class2({
    type: "readonly",
    innerType
  });
}
function _templateLiteral(Class2, parts, params) {
  return new Class2({
    type: "template_literal",
    parts,
    ...normalizeParams(params)
  });
}
function _lazy(Class2, getter) {
  return new Class2({
    type: "lazy",
    getter
  });
}
function _promise(Class2, innerType) {
  return new Class2({
    type: "promise",
    innerType
  });
}
function _custom(Class2, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema2 = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
  return schema2;
}
function _refine(Class2, fn, _params) {
  const schema2 = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema2;
}
function _stringbool(Classes, _params) {
  const params = normalizeParams(_params);
  let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
  let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  if (params.case !== "sensitive") {
    truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
    falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
  }
  const truthySet = new Set(truthyArray);
  const falsySet = new Set(falsyArray);
  const _Pipe = Classes.Pipe ?? $ZodPipe;
  const _Boolean = Classes.Boolean ?? $ZodBoolean;
  const _String = Classes.String ?? $ZodString;
  const _Transform = Classes.Transform ?? $ZodTransform;
  const tx = new _Transform({
    type: "transform",
    transform: (input, payload) => {
      let data = input;
      if (params.case !== "sensitive")
        data = data.toLowerCase();
      if (truthySet.has(data)) {
        return true;
      } else if (falsySet.has(data)) {
        return false;
      } else {
        payload.issues.push({
          code: "invalid_value",
          expected: "stringbool",
          values: [...truthySet, ...falsySet],
          input: payload.value,
          inst: tx
        });
        return {};
      }
    },
    error: params.error
  });
  const innerPipe = new _Pipe({
    type: "pipe",
    in: new _String({ type: "string", error: params.error }),
    out: tx,
    error: params.error
  });
  const outerPipe = new _Pipe({
    type: "pipe",
    in: innerPipe,
    out: new _Boolean({
      type: "boolean",
      error: params.error
    }),
    error: params.error
  });
  return outerPipe;
}
function _stringFormat(Class2, format, fnOrRegex, _params = {}) {
  const params = normalizeParams(_params);
  const def = {
    ...normalizeParams(_params),
    check: "string_format",
    type: "string",
    format,
    fn: typeof fnOrRegex === "function" ? fnOrRegex : (val2) => fnOrRegex.test(val2),
    ...params
  };
  if (fnOrRegex instanceof RegExp) {
    def.pattern = fnOrRegex;
  }
  const inst = new Class2(def);
  return inst;
}
class $ZodFunction {
  constructor(def) {
    this._def = def;
    this.def = def;
  }
  implement(func) {
    if (typeof func !== "function") {
      throw new Error("implement() must be called with a function");
    }
    const impl = ((...args) => {
      const parsedArgs = this._def.input ? parse$1(this._def.input, args, void 0, { callee: impl }) : args;
      if (!Array.isArray(parsedArgs)) {
        throw new Error("Invalid arguments schema: not an array or tuple schema.");
      }
      const output = func(...parsedArgs);
      return this._def.output ? parse$1(this._def.output, output, void 0, { callee: impl }) : output;
    });
    return impl;
  }
  implementAsync(func) {
    if (typeof func !== "function") {
      throw new Error("implement() must be called with a function");
    }
    const impl = (async (...args) => {
      const parsedArgs = this._def.input ? await parseAsync$1(this._def.input, args, void 0, { callee: impl }) : args;
      if (!Array.isArray(parsedArgs)) {
        throw new Error("Invalid arguments schema: not an array or tuple schema.");
      }
      const output = await func(...parsedArgs);
      return this._def.output ? parseAsync$1(this._def.output, output, void 0, { callee: impl }) : output;
    });
    return impl;
  }
  input(...args) {
    const F = this.constructor;
    if (Array.isArray(args[0])) {
      return new F({
        type: "function",
        input: new $ZodTuple({
          type: "tuple",
          items: args[0],
          rest: args[1]
        }),
        output: this._def.output
      });
    }
    return new F({
      type: "function",
      input: args[0],
      output: this._def.output
    });
  }
  output(output) {
    const F = this.constructor;
    return new F({
      type: "function",
      input: this._def.input,
      output
    });
  }
}
function _function(params) {
  return new $ZodFunction({
    type: "function",
    input: Array.isArray(params?.input) ? _tuple($ZodTuple, params?.input) : params?.input ?? _array($ZodArray, _unknown($ZodUnknown)),
    output: params?.output ?? _unknown($ZodUnknown)
  });
}
class JSONSchemaGenerator {
  constructor(params) {
    this.counter = 0;
    this.metadataRegistry = params?.metadata ?? globalRegistry;
    this.target = params?.target ?? "draft-2020-12";
    this.unrepresentable = params?.unrepresentable ?? "throw";
    this.override = params?.override ?? (() => {
    });
    this.io = params?.io ?? "output";
    this.seen = /* @__PURE__ */ new Map();
  }
  process(schema2, _params = { path: [], schemaPath: [] }) {
    var _a;
    const def = schema2._zod.def;
    const formatMap = {
      guid: "uuid",
      url: "uri",
      datetime: "date-time",
      json_string: "json-string",
      regex: ""
      // do not set
    };
    const seen = this.seen.get(schema2);
    if (seen) {
      seen.count++;
      const isCycle = _params.schemaPath.includes(schema2);
      if (isCycle) {
        seen.cycle = _params.path;
      }
      return seen.schema;
    }
    const result2 = { schema: {}, count: 1, cycle: void 0, path: _params.path };
    this.seen.set(schema2, result2);
    const overrideSchema = schema2._zod.toJSONSchema?.();
    if (overrideSchema) {
      result2.schema = overrideSchema;
    } else {
      const params = {
        ..._params,
        schemaPath: [..._params.schemaPath, schema2],
        path: _params.path
      };
      const parent = schema2._zod.parent;
      if (parent) {
        result2.ref = parent;
        this.process(parent, params);
        this.seen.get(parent).isParent = true;
      } else {
        const _json = result2.schema;
        switch (def.type) {
          case "string": {
            const json2 = _json;
            json2.type = "string";
            const { minimum, maximum, format, patterns, contentEncoding } = schema2._zod.bag;
            if (typeof minimum === "number")
              json2.minLength = minimum;
            if (typeof maximum === "number")
              json2.maxLength = maximum;
            if (format) {
              json2.format = formatMap[format] ?? format;
              if (json2.format === "")
                delete json2.format;
            }
            if (contentEncoding)
              json2.contentEncoding = contentEncoding;
            if (patterns && patterns.size > 0) {
              const regexes2 = [...patterns];
              if (regexes2.length === 1)
                json2.pattern = regexes2[0].source;
              else if (regexes2.length > 1) {
                result2.schema.allOf = [
                  ...regexes2.map((regex) => ({
                    ...this.target === "draft-7" ? { type: "string" } : {},
                    pattern: regex.source
                  }))
                ];
              }
            }
            break;
          }
          case "number": {
            const json2 = _json;
            const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema2._zod.bag;
            if (typeof format === "string" && format.includes("int"))
              json2.type = "integer";
            else
              json2.type = "number";
            if (typeof exclusiveMinimum === "number")
              json2.exclusiveMinimum = exclusiveMinimum;
            if (typeof minimum === "number") {
              json2.minimum = minimum;
              if (typeof exclusiveMinimum === "number") {
                if (exclusiveMinimum >= minimum)
                  delete json2.minimum;
                else
                  delete json2.exclusiveMinimum;
              }
            }
            if (typeof exclusiveMaximum === "number")
              json2.exclusiveMaximum = exclusiveMaximum;
            if (typeof maximum === "number") {
              json2.maximum = maximum;
              if (typeof exclusiveMaximum === "number") {
                if (exclusiveMaximum <= maximum)
                  delete json2.maximum;
                else
                  delete json2.exclusiveMaximum;
              }
            }
            if (typeof multipleOf === "number")
              json2.multipleOf = multipleOf;
            break;
          }
          case "boolean": {
            const json2 = _json;
            json2.type = "boolean";
            break;
          }
          case "bigint": {
            if (this.unrepresentable === "throw") {
              throw new Error("BigInt cannot be represented in JSON Schema");
            }
            break;
          }
          case "symbol": {
            if (this.unrepresentable === "throw") {
              throw new Error("Symbols cannot be represented in JSON Schema");
            }
            break;
          }
          case "null": {
            _json.type = "null";
            break;
          }
          case "any": {
            break;
          }
          case "unknown": {
            break;
          }
          case "undefined": {
            if (this.unrepresentable === "throw") {
              throw new Error("Undefined cannot be represented in JSON Schema");
            }
            break;
          }
          case "void": {
            if (this.unrepresentable === "throw") {
              throw new Error("Void cannot be represented in JSON Schema");
            }
            break;
          }
          case "never": {
            _json.not = {};
            break;
          }
          case "date": {
            if (this.unrepresentable === "throw") {
              throw new Error("Date cannot be represented in JSON Schema");
            }
            break;
          }
          case "array": {
            const json2 = _json;
            const { minimum, maximum } = schema2._zod.bag;
            if (typeof minimum === "number")
              json2.minItems = minimum;
            if (typeof maximum === "number")
              json2.maxItems = maximum;
            json2.type = "array";
            json2.items = this.process(def.element, { ...params, path: [...params.path, "items"] });
            break;
          }
          case "object": {
            const json2 = _json;
            json2.type = "object";
            json2.properties = {};
            const shape = def.shape;
            for (const key in shape) {
              json2.properties[key] = this.process(shape[key], {
                ...params,
                path: [...params.path, "properties", key]
              });
            }
            const allKeys = new Set(Object.keys(shape));
            const requiredKeys = new Set([...allKeys].filter((key) => {
              const v = def.shape[key]._zod;
              if (this.io === "input") {
                return v.optin === void 0;
              } else {
                return v.optout === void 0;
              }
            }));
            if (requiredKeys.size > 0) {
              json2.required = Array.from(requiredKeys);
            }
            if (def.catchall?._zod.def.type === "never") {
              json2.additionalProperties = false;
            } else if (!def.catchall) {
              if (this.io === "output")
                json2.additionalProperties = false;
            } else if (def.catchall) {
              json2.additionalProperties = this.process(def.catchall, {
                ...params,
                path: [...params.path, "additionalProperties"]
              });
            }
            break;
          }
          case "union": {
            const json2 = _json;
            json2.anyOf = def.options.map((x, i) => this.process(x, {
              ...params,
              path: [...params.path, "anyOf", i]
            }));
            break;
          }
          case "intersection": {
            const json2 = _json;
            const a = this.process(def.left, {
              ...params,
              path: [...params.path, "allOf", 0]
            });
            const b = this.process(def.right, {
              ...params,
              path: [...params.path, "allOf", 1]
            });
            const isSimpleIntersection = (val2) => "allOf" in val2 && Object.keys(val2).length === 1;
            const allOf = [
              ...isSimpleIntersection(a) ? a.allOf : [a],
              ...isSimpleIntersection(b) ? b.allOf : [b]
            ];
            json2.allOf = allOf;
            break;
          }
          case "tuple": {
            const json2 = _json;
            json2.type = "array";
            const prefixItems = def.items.map((x, i) => this.process(x, { ...params, path: [...params.path, "prefixItems", i] }));
            if (this.target === "draft-2020-12") {
              json2.prefixItems = prefixItems;
            } else {
              json2.items = prefixItems;
            }
            if (def.rest) {
              const rest = this.process(def.rest, {
                ...params,
                path: [...params.path, "items"]
              });
              if (this.target === "draft-2020-12") {
                json2.items = rest;
              } else {
                json2.additionalItems = rest;
              }
            }
            if (def.rest) {
              json2.items = this.process(def.rest, {
                ...params,
                path: [...params.path, "items"]
              });
            }
            const { minimum, maximum } = schema2._zod.bag;
            if (typeof minimum === "number")
              json2.minItems = minimum;
            if (typeof maximum === "number")
              json2.maxItems = maximum;
            break;
          }
          case "record": {
            const json2 = _json;
            json2.type = "object";
            json2.propertyNames = this.process(def.keyType, { ...params, path: [...params.path, "propertyNames"] });
            json2.additionalProperties = this.process(def.valueType, {
              ...params,
              path: [...params.path, "additionalProperties"]
            });
            break;
          }
          case "map": {
            if (this.unrepresentable === "throw") {
              throw new Error("Map cannot be represented in JSON Schema");
            }
            break;
          }
          case "set": {
            if (this.unrepresentable === "throw") {
              throw new Error("Set cannot be represented in JSON Schema");
            }
            break;
          }
          case "enum": {
            const json2 = _json;
            const values = getEnumValues(def.entries);
            if (values.every((v) => typeof v === "number"))
              json2.type = "number";
            if (values.every((v) => typeof v === "string"))
              json2.type = "string";
            json2.enum = values;
            break;
          }
          case "literal": {
            const json2 = _json;
            const vals = [];
            for (const val2 of def.values) {
              if (val2 === void 0) {
                if (this.unrepresentable === "throw") {
                  throw new Error("Literal `undefined` cannot be represented in JSON Schema");
                }
              } else if (typeof val2 === "bigint") {
                if (this.unrepresentable === "throw") {
                  throw new Error("BigInt literals cannot be represented in JSON Schema");
                } else {
                  vals.push(Number(val2));
                }
              } else {
                vals.push(val2);
              }
            }
            if (vals.length === 0) ;
            else if (vals.length === 1) {
              const val2 = vals[0];
              json2.type = val2 === null ? "null" : typeof val2;
              json2.const = val2;
            } else {
              if (vals.every((v) => typeof v === "number"))
                json2.type = "number";
              if (vals.every((v) => typeof v === "string"))
                json2.type = "string";
              if (vals.every((v) => typeof v === "boolean"))
                json2.type = "string";
              if (vals.every((v) => v === null))
                json2.type = "null";
              json2.enum = vals;
            }
            break;
          }
          case "file": {
            const json2 = _json;
            const file2 = {
              type: "string",
              format: "binary",
              contentEncoding: "binary"
            };
            const { minimum, maximum, mime } = schema2._zod.bag;
            if (minimum !== void 0)
              file2.minLength = minimum;
            if (maximum !== void 0)
              file2.maxLength = maximum;
            if (mime) {
              if (mime.length === 1) {
                file2.contentMediaType = mime[0];
                Object.assign(json2, file2);
              } else {
                json2.anyOf = mime.map((m) => {
                  const mFile = { ...file2, contentMediaType: m };
                  return mFile;
                });
              }
            } else {
              Object.assign(json2, file2);
            }
            break;
          }
          case "transform": {
            if (this.unrepresentable === "throw") {
              throw new Error("Transforms cannot be represented in JSON Schema");
            }
            break;
          }
          case "nullable": {
            const inner = this.process(def.innerType, params);
            _json.anyOf = [inner, { type: "null" }];
            break;
          }
          case "nonoptional": {
            this.process(def.innerType, params);
            result2.ref = def.innerType;
            break;
          }
          case "success": {
            const json2 = _json;
            json2.type = "boolean";
            break;
          }
          case "default": {
            this.process(def.innerType, params);
            result2.ref = def.innerType;
            _json.default = JSON.parse(JSON.stringify(def.defaultValue));
            break;
          }
          case "prefault": {
            this.process(def.innerType, params);
            result2.ref = def.innerType;
            if (this.io === "input")
              _json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
            break;
          }
          case "catch": {
            this.process(def.innerType, params);
            result2.ref = def.innerType;
            let catchValue;
            try {
              catchValue = def.catchValue(void 0);
            } catch {
              throw new Error("Dynamic catch values are not supported in JSON Schema");
            }
            _json.default = catchValue;
            break;
          }
          case "nan": {
            if (this.unrepresentable === "throw") {
              throw new Error("NaN cannot be represented in JSON Schema");
            }
            break;
          }
          case "template_literal": {
            const json2 = _json;
            const pattern = schema2._zod.pattern;
            if (!pattern)
              throw new Error("Pattern not found in template literal");
            json2.type = "string";
            json2.pattern = pattern.source;
            break;
          }
          case "pipe": {
            const innerType = this.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
            this.process(innerType, params);
            result2.ref = innerType;
            break;
          }
          case "readonly": {
            this.process(def.innerType, params);
            result2.ref = def.innerType;
            _json.readOnly = true;
            break;
          }
          // passthrough types
          case "promise": {
            this.process(def.innerType, params);
            result2.ref = def.innerType;
            break;
          }
          case "optional": {
            this.process(def.innerType, params);
            result2.ref = def.innerType;
            break;
          }
          case "lazy": {
            const innerType = schema2._zod.innerType;
            this.process(innerType, params);
            result2.ref = innerType;
            break;
          }
          case "custom": {
            if (this.unrepresentable === "throw") {
              throw new Error("Custom types cannot be represented in JSON Schema");
            }
            break;
          }
        }
      }
    }
    const meta = this.metadataRegistry.get(schema2);
    if (meta)
      Object.assign(result2.schema, meta);
    if (this.io === "input" && isTransforming(schema2)) {
      delete result2.schema.examples;
      delete result2.schema.default;
    }
    if (this.io === "input" && result2.schema._prefault)
      (_a = result2.schema).default ?? (_a.default = result2.schema._prefault);
    delete result2.schema._prefault;
    const _result = this.seen.get(schema2);
    return _result.schema;
  }
  emit(schema2, _params) {
    const params = {
      cycles: _params?.cycles ?? "ref",
      reused: _params?.reused ?? "inline",
      // unrepresentable: _params?.unrepresentable ?? "throw",
      // uri: _params?.uri ?? ((id) => `${id}`),
      external: _params?.external ?? void 0
    };
    const root = this.seen.get(schema2);
    if (!root)
      throw new Error("Unprocessed schema. This is a bug in Zod.");
    const makeURI = (entry) => {
      const defsSegment = this.target === "draft-2020-12" ? "$defs" : "definitions";
      if (params.external) {
        const externalId = params.external.registry.get(entry[0])?.id;
        const uriGenerator = params.external.uri ?? ((id3) => id3);
        if (externalId) {
          return { ref: uriGenerator(externalId) };
        }
        const id2 = entry[1].defId ?? entry[1].schema.id ?? `schema${this.counter++}`;
        entry[1].defId = id2;
        return { defId: id2, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id2}` };
      }
      if (entry[1] === root) {
        return { ref: "#" };
      }
      const uriPrefix = `#`;
      const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
      const defId = entry[1].schema.id ?? `__schema${this.counter++}`;
      return { defId, ref: defUriPrefix + defId };
    };
    const extractToDef = (entry) => {
      if (entry[1].schema.$ref) {
        return;
      }
      const seen = entry[1];
      const { ref, defId } = makeURI(entry);
      seen.def = { ...seen.schema };
      if (defId)
        seen.defId = defId;
      const schema3 = seen.schema;
      for (const key in schema3) {
        delete schema3[key];
      }
      schema3.$ref = ref;
    };
    if (params.cycles === "throw") {
      for (const entry of this.seen.entries()) {
        const seen = entry[1];
        if (seen.cycle) {
          throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
        }
      }
    }
    for (const entry of this.seen.entries()) {
      const seen = entry[1];
      if (schema2 === entry[0]) {
        extractToDef(entry);
        continue;
      }
      if (params.external) {
        const ext = params.external.registry.get(entry[0])?.id;
        if (schema2 !== entry[0] && ext) {
          extractToDef(entry);
          continue;
        }
      }
      const id2 = this.metadataRegistry.get(entry[0])?.id;
      if (id2) {
        extractToDef(entry);
        continue;
      }
      if (seen.cycle) {
        extractToDef(entry);
        continue;
      }
      if (seen.count > 1) {
        if (params.reused === "ref") {
          extractToDef(entry);
          continue;
        }
      }
    }
    const flattenRef = (zodSchema, params2) => {
      const seen = this.seen.get(zodSchema);
      const schema3 = seen.def ?? seen.schema;
      const _cached = { ...schema3 };
      if (seen.ref === null) {
        return;
      }
      const ref = seen.ref;
      seen.ref = null;
      if (ref) {
        flattenRef(ref, params2);
        const refSchema = this.seen.get(ref).schema;
        if (refSchema.$ref && params2.target === "draft-7") {
          schema3.allOf = schema3.allOf ?? [];
          schema3.allOf.push(refSchema);
        } else {
          Object.assign(schema3, refSchema);
          Object.assign(schema3, _cached);
        }
      }
      if (!seen.isParent)
        this.override({
          zodSchema,
          jsonSchema: schema3,
          path: seen.path ?? []
        });
    };
    for (const entry of [...this.seen.entries()].reverse()) {
      flattenRef(entry[0], { target: this.target });
    }
    const result2 = {};
    if (this.target === "draft-2020-12") {
      result2.$schema = "https://json-schema.org/draft/2020-12/schema";
    } else if (this.target === "draft-7") {
      result2.$schema = "http://json-schema.org/draft-07/schema#";
    } else {
      console.warn(`Invalid target: ${this.target}`);
    }
    if (params.external?.uri) {
      const id2 = params.external.registry.get(schema2)?.id;
      if (!id2)
        throw new Error("Schema is missing an `id` property");
      result2.$id = params.external.uri(id2);
    }
    Object.assign(result2, root.def);
    const defs = params.external?.defs ?? {};
    for (const entry of this.seen.entries()) {
      const seen = entry[1];
      if (seen.def && seen.defId) {
        defs[seen.defId] = seen.def;
      }
    }
    if (params.external) ;
    else {
      if (Object.keys(defs).length > 0) {
        if (this.target === "draft-2020-12") {
          result2.$defs = defs;
        } else {
          result2.definitions = defs;
        }
      }
    }
    try {
      return JSON.parse(JSON.stringify(result2));
    } catch (_err) {
      throw new Error("Error converting schema to JSON.");
    }
  }
}
function toJSONSchema(input, _params) {
  if (input instanceof $ZodRegistry) {
    const gen2 = new JSONSchemaGenerator(_params);
    const defs = {};
    for (const entry of input._idmap.entries()) {
      const [_, schema2] = entry;
      gen2.process(schema2);
    }
    const schemas = {};
    const external = {
      registry: input,
      uri: _params?.uri,
      defs
    };
    for (const entry of input._idmap.entries()) {
      const [key, schema2] = entry;
      schemas[key] = gen2.emit(schema2, {
        ..._params,
        external
      });
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = gen2.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const gen = new JSONSchemaGenerator(_params);
  gen.process(input);
  return gen.emit(input, _params);
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const schema2 = _schema;
  const def = schema2._zod.def;
  switch (def.type) {
    case "string":
    case "number":
    case "bigint":
    case "boolean":
    case "date":
    case "symbol":
    case "undefined":
    case "null":
    case "any":
    case "unknown":
    case "never":
    case "void":
    case "literal":
    case "enum":
    case "nan":
    case "file":
    case "template_literal":
      return false;
    case "array": {
      return isTransforming(def.element, ctx);
    }
    case "object": {
      for (const key in def.shape) {
        if (isTransforming(def.shape[key], ctx))
          return true;
      }
      return false;
    }
    case "union": {
      for (const option of def.options) {
        if (isTransforming(option, ctx))
          return true;
      }
      return false;
    }
    case "intersection": {
      return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
    }
    case "tuple": {
      for (const item of def.items) {
        if (isTransforming(item, ctx))
          return true;
      }
      if (def.rest && isTransforming(def.rest, ctx))
        return true;
      return false;
    }
    case "record": {
      return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
    }
    case "map": {
      return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
    }
    case "set": {
      return isTransforming(def.valueType, ctx);
    }
    // inner types
    case "promise":
    case "optional":
    case "nonoptional":
    case "nullable":
    case "readonly":
      return isTransforming(def.innerType, ctx);
    case "lazy":
      return isTransforming(def.getter(), ctx);
    case "default": {
      return isTransforming(def.innerType, ctx);
    }
    case "prefault": {
      return isTransforming(def.innerType, ctx);
    }
    case "custom": {
      return false;
    }
    case "transform": {
      return true;
    }
    case "pipe": {
      return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
    }
    case "success": {
      return false;
    }
    case "catch": {
      return false;
    }
  }
  throw new Error(`Unknown schema type: ${def.type}`);
}
const jsonSchema$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $ZodAny,
  $ZodArray,
  $ZodAsyncError,
  $ZodBase64,
  $ZodBase64URL,
  $ZodBigInt,
  $ZodBigIntFormat,
  $ZodBoolean,
  $ZodCIDRv4,
  $ZodCIDRv6,
  $ZodCUID,
  $ZodCUID2,
  $ZodCatch,
  $ZodCheck,
  $ZodCheckBigIntFormat,
  $ZodCheckEndsWith,
  $ZodCheckGreaterThan,
  $ZodCheckIncludes,
  $ZodCheckLengthEquals,
  $ZodCheckLessThan,
  $ZodCheckLowerCase,
  $ZodCheckMaxLength,
  $ZodCheckMaxSize,
  $ZodCheckMimeType,
  $ZodCheckMinLength,
  $ZodCheckMinSize,
  $ZodCheckMultipleOf,
  $ZodCheckNumberFormat,
  $ZodCheckOverwrite,
  $ZodCheckProperty,
  $ZodCheckRegex,
  $ZodCheckSizeEquals,
  $ZodCheckStartsWith,
  $ZodCheckStringFormat,
  $ZodCheckUpperCase,
  $ZodCustom,
  $ZodCustomStringFormat,
  $ZodDate,
  $ZodDefault,
  $ZodDiscriminatedUnion,
  $ZodE164,
  $ZodEmail,
  $ZodEmoji,
  $ZodEnum,
  $ZodError,
  $ZodFile,
  $ZodFunction,
  $ZodGUID,
  $ZodIPv4,
  $ZodIPv6,
  $ZodISODate,
  $ZodISODateTime,
  $ZodISODuration,
  $ZodISOTime,
  $ZodIntersection,
  $ZodJWT,
  $ZodKSUID,
  $ZodLazy,
  $ZodLiteral,
  $ZodMap,
  $ZodNaN,
  $ZodNanoID,
  $ZodNever,
  $ZodNonOptional,
  $ZodNull,
  $ZodNullable,
  $ZodNumber,
  $ZodNumberFormat,
  $ZodObject,
  $ZodOptional,
  $ZodPipe,
  $ZodPrefault,
  $ZodPromise,
  $ZodReadonly,
  $ZodRealError,
  $ZodRecord,
  $ZodRegistry,
  $ZodSet,
  $ZodString,
  $ZodStringFormat,
  $ZodSuccess,
  $ZodSymbol,
  $ZodTemplateLiteral,
  $ZodTransform,
  $ZodTuple,
  $ZodType,
  $ZodULID,
  $ZodURL,
  $ZodUUID,
  $ZodUndefined,
  $ZodUnion,
  $ZodUnknown,
  $ZodVoid,
  $ZodXID,
  $brand,
  $constructor,
  $input,
  $output,
  Doc,
  JSONSchema: jsonSchema$1,
  JSONSchemaGenerator,
  NEVER,
  TimePrecision,
  _any,
  _array,
  _base64,
  _base64url,
  _bigint,
  _boolean,
  _catch: _catch$1,
  _cidrv4,
  _cidrv6,
  _coercedBigint,
  _coercedBoolean,
  _coercedDate,
  _coercedNumber,
  _coercedString,
  _cuid,
  _cuid2,
  _custom,
  _date,
  _default: _default$1,
  _discriminatedUnion,
  _e164,
  _email,
  _emoji,
  _endsWith,
  _enum: _enum$1,
  _file,
  _float32,
  _float64,
  _gt,
  _gte,
  _guid,
  _includes,
  _int,
  _int32,
  _int64,
  _intersection,
  _ipv4,
  _ipv6,
  _isoDate,
  _isoDateTime,
  _isoDuration,
  _isoTime,
  _jwt,
  _ksuid,
  _lazy,
  _length,
  _literal,
  _lowercase,
  _lt,
  _lte,
  _map,
  _max: _lte,
  _maxLength,
  _maxSize,
  _mime,
  _min: _gte,
  _minLength,
  _minSize,
  _multipleOf,
  _nan,
  _nanoid,
  _nativeEnum,
  _negative,
  _never,
  _nonnegative,
  _nonoptional,
  _nonpositive,
  _normalize,
  _null: _null$1,
  _nullable,
  _number,
  _optional,
  _overwrite,
  _parse,
  _parseAsync,
  _pipe,
  _positive,
  _promise,
  _property,
  _readonly,
  _record,
  _refine,
  _regex,
  _safeParse,
  _safeParseAsync,
  _set,
  _size,
  _startsWith,
  _string,
  _stringFormat,
  _stringbool,
  _success,
  _symbol,
  _templateLiteral,
  _toLowerCase,
  _toUpperCase,
  _transform,
  _trim,
  _tuple,
  _uint32,
  _uint64,
  _ulid,
  _undefined: _undefined$1,
  _union,
  _unknown,
  _uppercase,
  _url,
  _uuid,
  _uuidv4,
  _uuidv6,
  _uuidv7,
  _void: _void$1,
  _xid,
  clone,
  config,
  flattenError,
  formatError,
  function: _function,
  globalConfig,
  globalRegistry,
  isValidBase64,
  isValidBase64URL,
  isValidJWT,
  locales: index$1,
  parse: parse$1,
  parseAsync: parseAsync$1,
  prettifyError,
  regexes,
  registry,
  safeParse: safeParse$1,
  safeParseAsync: safeParseAsync$1,
  toDotPath,
  toJSONSchema,
  treeifyError,
  util,
  version
}, Symbol.toStringTag, { value: "Module" }));
const ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function datetime(params) {
  return _isoDateTime(ZodISODateTime, params);
}
const ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function date$2(params) {
  return _isoDate(ZodISODate, params);
}
const ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function time(params) {
  return _isoTime(ZodISOTime, params);
}
const ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function duration(params) {
  return _isoDuration(ZodISODuration, params);
}
const iso = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ZodISODate,
  ZodISODateTime,
  ZodISODuration,
  ZodISOTime,
  date: date$2,
  datetime,
  duration,
  time
}, Symbol.toStringTag, { value: "Module" }));
const initializer = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  Object.defineProperties(inst, {
    format: {
      value: (mapper) => formatError(inst, mapper)
      // enumerable: false,
    },
    flatten: {
      value: (mapper) => flattenError(inst, mapper)
      // enumerable: false,
    },
    addIssue: {
      value: (issue2) => inst.issues.push(issue2)
      // enumerable: false,
    },
    addIssues: {
      value: (issues2) => inst.issues.push(...issues2)
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return inst.issues.length === 0;
      }
      // enumerable: false,
    }
  });
};
const ZodError = $constructor("ZodError", initializer);
const ZodRealError = $constructor("ZodError", initializer, {
  Parent: Error
});
const parse = /* @__PURE__ */ _parse(ZodRealError);
const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
const ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  $ZodType.init(inst, def);
  inst.def = def;
  Object.defineProperty(inst, "_def", { value: def });
  inst.check = (...checks) => {
    return inst.clone(
      {
        ...def,
        checks: [
          ...def.checks ?? [],
          ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
        ]
      }
      // { parent: true }
    );
  };
  inst.clone = (def2, params) => clone(inst, def2, params);
  inst.brand = () => inst;
  inst.register = ((reg, meta) => {
    reg.add(inst, meta);
    return inst;
  });
  inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse(inst, data, params);
  inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
  inst.spa = inst.safeParseAsync;
  inst.refine = (check2, params) => inst.check(refine(check2, params));
  inst.superRefine = (refinement) => inst.check(superRefine(refinement));
  inst.overwrite = (fn) => inst.check(_overwrite(fn));
  inst.optional = () => optional(inst);
  inst.nullable = () => nullable(inst);
  inst.nullish = () => optional(nullable(inst));
  inst.nonoptional = (params) => nonoptional(inst, params);
  inst.array = () => array(inst);
  inst.or = (arg) => union([inst, arg]);
  inst.and = (arg) => intersection(inst, arg);
  inst.transform = (tx) => pipe(inst, transform(tx));
  inst.default = (def2) => _default(inst, def2);
  inst.prefault = (def2) => prefault(inst, def2);
  inst.catch = (params) => _catch(inst, params);
  inst.pipe = (target) => pipe(inst, target);
  inst.readonly = () => readonly(inst);
  inst.describe = (description) => {
    const cl = inst.clone();
    globalRegistry.add(cl, { description });
    return cl;
  };
  Object.defineProperty(inst, "description", {
    get() {
      return globalRegistry.get(inst)?.description;
    },
    configurable: true
  });
  inst.meta = (...args) => {
    if (args.length === 0) {
      return globalRegistry.get(inst);
    }
    const cl = inst.clone();
    globalRegistry.add(cl, args[0]);
    return cl;
  };
  inst.isOptional = () => inst.safeParse(void 0).success;
  inst.isNullable = () => inst.safeParse(null).success;
  return inst;
});
const _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType.init(inst, def);
  const bag = inst._zod.bag;
  inst.format = bag.format ?? null;
  inst.minLength = bag.minimum ?? null;
  inst.maxLength = bag.maximum ?? null;
  inst.regex = (...args) => inst.check(_regex(...args));
  inst.includes = (...args) => inst.check(_includes(...args));
  inst.startsWith = (...args) => inst.check(_startsWith(...args));
  inst.endsWith = (...args) => inst.check(_endsWith(...args));
  inst.min = (...args) => inst.check(_minLength(...args));
  inst.max = (...args) => inst.check(_maxLength(...args));
  inst.length = (...args) => inst.check(_length(...args));
  inst.nonempty = (...args) => inst.check(_minLength(1, ...args));
  inst.lowercase = (params) => inst.check(_lowercase(params));
  inst.uppercase = (params) => inst.check(_uppercase(params));
  inst.trim = () => inst.check(_trim());
  inst.normalize = (...args) => inst.check(_normalize(...args));
  inst.toLowerCase = () => inst.check(_toLowerCase());
  inst.toUpperCase = () => inst.check(_toUpperCase());
});
const ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
  inst.email = (params) => inst.check(_email(ZodEmail, params));
  inst.url = (params) => inst.check(_url(ZodURL, params));
  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
  inst.emoji = (params) => inst.check(_emoji(ZodEmoji, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
  inst.xid = (params) => inst.check(_xid(ZodXID, params));
  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
  inst.datetime = (params) => inst.check(datetime(params));
  inst.date = (params) => inst.check(date$2(params));
  inst.time = (params) => inst.check(time(params));
  inst.duration = (params) => inst.check(duration(params));
});
function string$1(params) {
  return _string(ZodString, params);
}
const ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
const ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function email(params) {
  return _email(ZodEmail, params);
}
const ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function guid(params) {
  return _guid(ZodGUID, params);
}
const ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function uuid(params) {
  return _uuid(ZodUUID, params);
}
function uuidv4(params) {
  return _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
  return _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
  return _uuidv7(ZodUUID, params);
}
const ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function url(params) {
  return _url(ZodURL, params);
}
const ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function emoji(params) {
  return _emoji(ZodEmoji, params);
}
const ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function nanoid(params) {
  return _nanoid(ZodNanoID, params);
}
const ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid(params) {
  return _cuid(ZodCUID, params);
}
const ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid2(params) {
  return _cuid2(ZodCUID2, params);
}
const ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ulid(params) {
  return _ulid(ZodULID, params);
}
const ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function xid(params) {
  return _xid(ZodXID, params);
}
const ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ksuid(params) {
  return _ksuid(ZodKSUID, params);
}
const ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv4(params) {
  return _ipv4(ZodIPv4, params);
}
const ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv6(params) {
  return _ipv6(ZodIPv6, params);
}
const ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv4(params) {
  return _cidrv4(ZodCIDRv4, params);
}
const ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv6(params) {
  return _cidrv6(ZodCIDRv6, params);
}
const ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base64(params) {
  return _base64(ZodBase64, params);
}
const ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base64url(params) {
  return _base64url(ZodBase64URL, params);
}
const ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function e164(params) {
  return _e164(ZodE164, params);
}
const ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function jwt(params) {
  return _jwt(ZodJWT, params);
}
const ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
  $ZodCustomStringFormat.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
  return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
const ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType.init(inst, def);
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.int = (params) => inst.check(int(params));
  inst.safe = (params) => inst.check(int(params));
  inst.positive = (params) => inst.check(_gt(0, params));
  inst.nonnegative = (params) => inst.check(_gte(0, params));
  inst.negative = (params) => inst.check(_lt(0, params));
  inst.nonpositive = (params) => inst.check(_lte(0, params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  inst.step = (value, params) => inst.check(_multipleOf(value, params));
  inst.finite = () => inst;
  const bag = inst._zod.bag;
  inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
  inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
  inst.isFinite = true;
  inst.format = bag.format ?? null;
});
function number$1(params) {
  return _number(ZodNumber, params);
}
const ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
function float32(params) {
  return _float32(ZodNumberFormat, params);
}
function float64(params) {
  return _float64(ZodNumberFormat, params);
}
function int32(params) {
  return _int32(ZodNumberFormat, params);
}
function uint32(params) {
  return _uint32(ZodNumberFormat, params);
}
const ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType.init(inst, def);
});
function boolean$1(params) {
  return _boolean(ZodBoolean, params);
}
const ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
  $ZodBigInt.init(inst, def);
  ZodType.init(inst, def);
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.positive = (params) => inst.check(_gt(BigInt(0), params));
  inst.negative = (params) => inst.check(_lt(BigInt(0), params));
  inst.nonpositive = (params) => inst.check(_lte(BigInt(0), params));
  inst.nonnegative = (params) => inst.check(_gte(BigInt(0), params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  const bag = inst._zod.bag;
  inst.minValue = bag.minimum ?? null;
  inst.maxValue = bag.maximum ?? null;
  inst.format = bag.format ?? null;
});
function bigint$1(params) {
  return _bigint(ZodBigInt, params);
}
const ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
  $ZodBigIntFormat.init(inst, def);
  ZodBigInt.init(inst, def);
});
function int64(params) {
  return _int64(ZodBigIntFormat, params);
}
function uint64(params) {
  return _uint64(ZodBigIntFormat, params);
}
const ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
  $ZodSymbol.init(inst, def);
  ZodType.init(inst, def);
});
function symbol(params) {
  return _symbol(ZodSymbol, params);
}
const ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
  $ZodUndefined.init(inst, def);
  ZodType.init(inst, def);
});
function _undefined(params) {
  return _undefined$1(ZodUndefined, params);
}
const ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodType.init(inst, def);
});
function _null(params) {
  return _null$1(ZodNull, params);
}
const ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodType.init(inst, def);
});
function any() {
  return _any(ZodAny);
}
const ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType.init(inst, def);
});
function unknown() {
  return _unknown(ZodUnknown);
}
const ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType.init(inst, def);
});
function never(params) {
  return _never(ZodNever, params);
}
const ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
  $ZodVoid.init(inst, def);
  ZodType.init(inst, def);
});
function _void(params) {
  return _void$1(ZodVoid, params);
}
const ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
  $ZodDate.init(inst, def);
  ZodType.init(inst, def);
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  const c = inst._zod.bag;
  inst.minDate = c.minimum ? new Date(c.minimum) : null;
  inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date$1(params) {
  return _date(ZodDate, params);
}
const ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst.element = def.element;
  inst.min = (minLength, params) => inst.check(_minLength(minLength, params));
  inst.nonempty = (params) => inst.check(_minLength(1, params));
  inst.max = (maxLength, params) => inst.check(_maxLength(maxLength, params));
  inst.length = (len, params) => inst.check(_length(len, params));
  inst.unwrap = () => inst.element;
});
function array(element, params) {
  return _array(ZodArray, element, params);
}
function keyof(schema2) {
  const shape = schema2._zod.def.shape;
  return literal(Object.keys(shape));
}
const ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  $ZodObject.init(inst, def);
  ZodType.init(inst, def);
  defineLazy(inst, "shape", () => def.shape);
  inst.keyof = () => _enum(Object.keys(inst._zod.def.shape));
  inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall });
  inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
  inst.strip = () => inst.clone({ ...inst._zod.def, catchall: void 0 });
  inst.extend = (incoming) => {
    return extend(inst, incoming);
  };
  inst.merge = (other) => merge(inst, other);
  inst.pick = (mask) => pick(inst, mask);
  inst.omit = (mask) => omit(inst, mask);
  inst.partial = (...args) => partial(ZodOptional, inst, args[0]);
  inst.required = (...args) => required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
  const def = {
    type: "object",
    get shape() {
      assignProp(this, "shape", { ...shape });
      return this.shape;
    },
    ...normalizeParams(params)
  };
  return new ZodObject(def);
}
function strictObject(shape, params) {
  return new ZodObject({
    type: "object",
    get shape() {
      assignProp(this, "shape", { ...shape });
      return this.shape;
    },
    catchall: never(),
    ...normalizeParams(params)
  });
}
function looseObject(shape, params) {
  return new ZodObject({
    type: "object",
    get shape() {
      assignProp(this, "shape", { ...shape });
      return this.shape;
    },
    catchall: unknown(),
    ...normalizeParams(params)
  });
}
const ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType.init(inst, def);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
const ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
const ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType.init(inst, def);
});
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right
  });
}
const ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
  $ZodTuple.init(inst, def);
  ZodType.init(inst, def);
  inst.rest = (rest) => inst.clone({
    ...inst._zod.def,
    rest
  });
});
function tuple(items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new ZodTuple({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
  });
}
const ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodType.init(inst, def);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function partialRecord(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType: union([keyType, never()]),
    valueType,
    ...normalizeParams(params)
  });
}
const ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
  $ZodMap.init(inst, def);
  ZodType.init(inst, def);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function map(keyType, valueType, params) {
  return new ZodMap({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
const ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
  $ZodSet.init(inst, def);
  ZodType.init(inst, def);
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function set(valueType, params) {
  return new ZodSet({
    type: "set",
    valueType,
    ...normalizeParams(params)
  });
}
const ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType.init(inst, def);
  inst.enum = def.entries;
  inst.options = Object.values(def.entries);
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function nativeEnum(entries, params) {
  return new ZodEnum({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
const ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    }
  });
});
function literal(value, params) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
const ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
  $ZodFile.init(inst, def);
  ZodType.init(inst, def);
  inst.min = (size, params) => inst.check(_minSize(size, params));
  inst.max = (size, params) => inst.check(_maxSize(size, params));
  inst.mime = (types2, params) => inst.check(_mime(Array.isArray(types2) ? types2 : [types2], params));
});
function file(params) {
  return _file(ZodFile, params);
}
const ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.addIssue = (issue$1) => {
      if (typeof issue$1 === "string") {
        payload.issues.push(issue(issue$1, payload.value, def));
      } else {
        const _issue = issue$1;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = inst);
        _issue.continue ?? (_issue.continue = true);
        payload.issues.push(issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    payload.value = output;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
const ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType
  });
}
const ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType
  });
}
function nullish(innerType) {
  return optional(nullable(innerType));
}
const ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
  });
}
const ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
  });
}
const ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
const ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
  $ZodSuccess.init(inst, def);
  ZodType.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
  return new ZodSuccess({
    type: "success",
    innerType
  });
}
const ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
const ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
  $ZodNaN.init(inst, def);
  ZodType.init(inst, def);
});
function nan(params) {
  return _nan(ZodNaN, params);
}
const ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType.init(inst, def);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
    // ...util.normalizeParams(params),
  });
}
const ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType.init(inst, def);
});
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType
  });
}
const ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
  $ZodTemplateLiteral.init(inst, def);
  ZodType.init(inst, def);
});
function templateLiteral(parts, params) {
  return new ZodTemplateLiteral({
    type: "template_literal",
    parts,
    ...normalizeParams(params)
  });
}
const ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodType.init(inst, def);
  inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
  return new ZodLazy({
    type: "lazy",
    getter
  });
}
const ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
  $ZodPromise.init(inst, def);
  ZodType.init(inst, def);
  inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
  return new ZodPromise({
    type: "promise",
    innerType
  });
}
const ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType.init(inst, def);
});
function check(fn) {
  const ch = new $ZodCheck({
    check: "custom"
    // ...util.normalizeParams(params),
  });
  ch._zod.check = fn;
  return ch;
}
function custom(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
  const ch = check((payload) => {
    payload.addIssue = (issue$1) => {
      if (typeof issue$1 === "string") {
        payload.issues.push(issue(issue$1, payload.value, ch._zod.def));
      } else {
        const _issue = issue$1;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  });
  return ch;
}
function _instanceof(cls, params = {
  error: `Input not instance of ${cls.name}`
}) {
  const inst = new ZodCustom({
    type: "custom",
    check: "custom",
    fn: (data) => data instanceof cls,
    abort: true,
    ...normalizeParams(params)
  });
  inst._zod.bag.Class = cls;
  return inst;
}
const stringbool = (...args) => _stringbool({
  Pipe: ZodPipe,
  Boolean: ZodBoolean,
  String: ZodString,
  Transform: ZodTransform
}, ...args);
function json(params) {
  const jsonSchema2 = lazy(() => {
    return union([string$1(params), number$1(), boolean$1(), _null(), array(jsonSchema2), record(string$1(), jsonSchema2)]);
  });
  return jsonSchema2;
}
function preprocess(fn, schema2) {
  return pipe(transform(fn), schema2);
}
const ZodIssueCode = {
  invalid_type: "invalid_type",
  too_big: "too_big",
  too_small: "too_small",
  invalid_format: "invalid_format",
  not_multiple_of: "not_multiple_of",
  unrecognized_keys: "unrecognized_keys",
  invalid_union: "invalid_union",
  invalid_key: "invalid_key",
  invalid_element: "invalid_element",
  invalid_value: "invalid_value",
  custom: "custom"
};
function setErrorMap(map2) {
  config({
    customError: map2
  });
}
function getErrorMap() {
  return config().customError;
}
function string(params) {
  return _coercedString(ZodString, params);
}
function number(params) {
  return _coercedNumber(ZodNumber, params);
}
function boolean(params) {
  return _coercedBoolean(ZodBoolean, params);
}
function bigint(params) {
  return _coercedBigint(ZodBigInt, params);
}
function date(params) {
  return _coercedDate(ZodDate, params);
}
const coerce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bigint,
  boolean,
  date,
  number,
  string
}, Symbol.toStringTag, { value: "Module" }));
config(en());
const z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $brand,
  $input,
  $output,
  NEVER,
  TimePrecision,
  ZodAny,
  ZodArray,
  ZodBase64,
  ZodBase64URL,
  ZodBigInt,
  ZodBigIntFormat,
  ZodBoolean,
  ZodCIDRv4,
  ZodCIDRv6,
  ZodCUID,
  ZodCUID2,
  ZodCatch,
  ZodCustom,
  ZodCustomStringFormat,
  ZodDate,
  ZodDefault,
  ZodDiscriminatedUnion,
  ZodE164,
  ZodEmail,
  ZodEmoji,
  ZodEnum,
  ZodError,
  ZodFile,
  ZodGUID,
  ZodIPv4,
  ZodIPv6,
  ZodISODate,
  ZodISODateTime,
  ZodISODuration,
  ZodISOTime,
  ZodIntersection,
  ZodIssueCode,
  ZodJWT,
  ZodKSUID,
  ZodLazy,
  ZodLiteral,
  ZodMap,
  ZodNaN,
  ZodNanoID,
  ZodNever,
  ZodNonOptional,
  ZodNull,
  ZodNullable,
  ZodNumber,
  ZodNumberFormat,
  ZodObject,
  ZodOptional,
  ZodPipe,
  ZodPrefault,
  ZodPromise,
  ZodReadonly,
  ZodRealError,
  ZodRecord,
  ZodSet,
  ZodString,
  ZodStringFormat,
  ZodSuccess,
  ZodSymbol,
  ZodTemplateLiteral,
  ZodTransform,
  ZodTuple,
  ZodType,
  ZodULID,
  ZodURL,
  ZodUUID,
  ZodUndefined,
  ZodUnion,
  ZodUnknown,
  ZodVoid,
  ZodXID,
  _ZodString,
  _default,
  any,
  array,
  base64,
  base64url,
  bigint: bigint$1,
  boolean: boolean$1,
  catch: _catch,
  check,
  cidrv4,
  cidrv6,
  clone,
  coerce,
  config,
  core: index,
  cuid,
  cuid2,
  custom,
  date: date$1,
  discriminatedUnion,
  e164,
  email,
  emoji,
  endsWith: _endsWith,
  enum: _enum,
  file,
  flattenError,
  float32,
  float64,
  formatError,
  function: _function,
  getErrorMap,
  globalRegistry,
  gt: _gt,
  gte: _gte,
  guid,
  includes: _includes,
  instanceof: _instanceof,
  int,
  int32,
  int64,
  intersection,
  ipv4,
  ipv6,
  iso,
  json,
  jwt,
  keyof,
  ksuid,
  lazy,
  length: _length,
  literal,
  locales: index$1,
  looseObject,
  lowercase: _lowercase,
  lt: _lt,
  lte: _lte,
  map,
  maxLength: _maxLength,
  maxSize: _maxSize,
  mime: _mime,
  minLength: _minLength,
  minSize: _minSize,
  multipleOf: _multipleOf,
  nan,
  nanoid,
  nativeEnum,
  negative: _negative,
  never,
  nonnegative: _nonnegative,
  nonoptional,
  nonpositive: _nonpositive,
  normalize: _normalize,
  null: _null,
  nullable,
  nullish,
  number: number$1,
  object,
  optional,
  overwrite: _overwrite,
  parse,
  parseAsync,
  partialRecord,
  pipe,
  positive: _positive,
  prefault,
  preprocess,
  prettifyError,
  promise,
  property: _property,
  readonly,
  record,
  refine,
  regex: _regex,
  regexes,
  registry,
  safeParse,
  safeParseAsync,
  set,
  setErrorMap,
  size: _size,
  startsWith: _startsWith,
  strictObject,
  string: string$1,
  stringFormat,
  stringbool,
  success,
  superRefine,
  symbol,
  templateLiteral,
  toJSONSchema,
  toLowerCase: _toLowerCase,
  toUpperCase: _toUpperCase,
  transform,
  treeifyError,
  trim: _trim,
  tuple,
  uint32,
  uint64,
  ulid,
  undefined: _undefined,
  union,
  unknown,
  uppercase: _uppercase,
  url,
  uuid,
  uuidv4,
  uuidv6,
  uuidv7,
  void: _void,
  xid
}, Symbol.toStringTag, { value: "Module" }));
const CONSTANTS = {
  INT8_MIN: -128,
  INT8_MAX: 127,
  INT8_UNSIGNED_MAX: 255,
  INT16_MIN: -32768,
  INT16_MAX: 32767,
  INT16_UNSIGNED_MAX: 65535,
  INT24_MIN: -8388608,
  INT24_MAX: 8388607,
  INT24_UNSIGNED_MAX: 16777215,
  INT32_MIN: -2147483648,
  INT32_MAX: 2147483647,
  INT32_UNSIGNED_MAX: 4294967295,
  INT48_MIN: -140737488355328,
  INT48_MAX: 140737488355327,
  INT48_UNSIGNED_MAX: 281474976710655,
  INT64_MIN: -9223372036854775808n,
  INT64_MAX: 9223372036854775807n,
  INT64_UNSIGNED_MAX: 18446744073709551615n
};
function isColumnType(column, columnTypes) {
  return columnTypes.includes(column.columnType);
}
function isWithEnum(column) {
  return "enumValues" in column && Array.isArray(column.enumValues) && column.enumValues.length > 0;
}
const literalSchema = union([string$1(), number$1(), boolean$1(), _null()]);
const jsonSchema = union([
  literalSchema,
  record(string$1(), any()),
  array(any())
]);
const bufferSchema = custom((v) => v instanceof Buffer);
function columnToSchema(column, factory) {
  const z$1 = z;
  const coerce2 = {};
  let schema2;
  if (isWithEnum(column)) {
    schema2 = column.enumValues.length ? z$1.enum(column.enumValues) : z$1.string();
  }
  if (!schema2) {
    if (isColumnType(column, ["PgGeometry", "PgPointTuple"])) {
      schema2 = z$1.tuple([z$1.number(), z$1.number()]);
    } else if (isColumnType(column, ["PgGeometryObject", "PgPointObject"])) {
      schema2 = z$1.object({ x: z$1.number(), y: z$1.number() });
    } else if (isColumnType(column, ["PgHalfVector", "PgVector"])) {
      schema2 = z$1.array(z$1.number());
      schema2 = column.dimensions ? schema2.length(column.dimensions) : schema2;
    } else if (isColumnType(column, ["PgLine"])) {
      schema2 = z$1.tuple([z$1.number(), z$1.number(), z$1.number()]);
    } else if (isColumnType(column, ["PgLineABC"])) {
      schema2 = z$1.object({
        a: z$1.number(),
        b: z$1.number(),
        c: z$1.number()
      });
    } else if (isColumnType(column, ["PgArray"])) {
      schema2 = z$1.array(columnToSchema(column.baseColumn));
      schema2 = column.size ? schema2.length(column.size) : schema2;
    } else if (column.dataType === "array") {
      schema2 = z$1.array(z$1.any());
    } else if (column.dataType === "number") {
      schema2 = numberColumnToSchema(column, z$1, coerce2);
    } else if (column.dataType === "bigint") {
      schema2 = bigintColumnToSchema(column, z$1, coerce2);
    } else if (column.dataType === "boolean") {
      schema2 = coerce2 === true || coerce2.boolean ? z$1.coerce.boolean() : z$1.boolean();
    } else if (column.dataType === "date") {
      schema2 = coerce2 === true || coerce2.date ? z$1.coerce.date() : z$1.date();
    } else if (column.dataType === "string") {
      schema2 = stringColumnToSchema(column, z$1, coerce2);
    } else if (column.dataType === "json") {
      schema2 = jsonSchema;
    } else if (column.dataType === "custom") {
      schema2 = z$1.any();
    } else if (column.dataType === "buffer") {
      schema2 = bufferSchema;
    }
  }
  if (!schema2) {
    schema2 = z$1.any();
  }
  return schema2;
}
function numberColumnToSchema(column, z2, coerce2) {
  let unsigned = column.getSQLType().includes("unsigned");
  let min;
  let max;
  let integer2 = false;
  if (isColumnType(column, ["MySqlTinyInt", "SingleStoreTinyInt"])) {
    min = unsigned ? 0 : CONSTANTS.INT8_MIN;
    max = unsigned ? CONSTANTS.INT8_UNSIGNED_MAX : CONSTANTS.INT8_MAX;
    integer2 = true;
  } else if (isColumnType(column, [
    "PgSmallInt",
    "PgSmallSerial",
    "MySqlSmallInt",
    "SingleStoreSmallInt"
  ])) {
    min = unsigned ? 0 : CONSTANTS.INT16_MIN;
    max = unsigned ? CONSTANTS.INT16_UNSIGNED_MAX : CONSTANTS.INT16_MAX;
    integer2 = true;
  } else if (isColumnType(column, [
    "PgReal",
    "MySqlFloat",
    "MySqlMediumInt",
    "SingleStoreMediumInt",
    "SingleStoreFloat"
  ])) {
    min = unsigned ? 0 : CONSTANTS.INT24_MIN;
    max = unsigned ? CONSTANTS.INT24_UNSIGNED_MAX : CONSTANTS.INT24_MAX;
    integer2 = isColumnType(column, ["MySqlMediumInt", "SingleStoreMediumInt"]);
  } else if (isColumnType(column, [
    "PgInteger",
    "PgSerial",
    "MySqlInt",
    "SingleStoreInt"
  ])) {
    min = unsigned ? 0 : CONSTANTS.INT32_MIN;
    max = unsigned ? CONSTANTS.INT32_UNSIGNED_MAX : CONSTANTS.INT32_MAX;
    integer2 = true;
  } else if (isColumnType(column, [
    "PgDoublePrecision",
    "MySqlReal",
    "MySqlDouble",
    "SingleStoreReal",
    "SingleStoreDouble",
    "SQLiteReal"
  ])) {
    min = unsigned ? 0 : CONSTANTS.INT48_MIN;
    max = unsigned ? CONSTANTS.INT48_UNSIGNED_MAX : CONSTANTS.INT48_MAX;
  } else if (isColumnType(column, [
    "PgBigInt53",
    "PgBigSerial53",
    "MySqlBigInt53",
    "MySqlSerial",
    "SingleStoreBigInt53",
    "SingleStoreSerial",
    "SQLiteInteger"
  ])) {
    unsigned = unsigned || isColumnType(column, ["MySqlSerial", "SingleStoreSerial"]);
    min = unsigned ? 0 : Number.MIN_SAFE_INTEGER;
    max = Number.MAX_SAFE_INTEGER;
    integer2 = true;
  } else if (isColumnType(column, ["MySqlYear", "SingleStoreYear"])) {
    min = 1901;
    max = 2155;
    integer2 = true;
  } else {
    min = Number.MIN_SAFE_INTEGER;
    max = Number.MAX_SAFE_INTEGER;
  }
  let schema2 = coerce2 === true || coerce2?.number ? integer2 ? z2.coerce.number() : z2.coerce.number().int() : integer2 ? z2.int() : z2.number();
  schema2 = schema2.gte(min).lte(max);
  return schema2;
}
function bigintColumnToSchema(column, z2, coerce2) {
  const unsigned = column.getSQLType().includes("unsigned");
  const min = unsigned ? 0n : CONSTANTS.INT64_MIN;
  const max = unsigned ? CONSTANTS.INT64_UNSIGNED_MAX : CONSTANTS.INT64_MAX;
  const schema2 = coerce2 === true || coerce2?.bigint ? z2.coerce.bigint() : z2.bigint();
  return schema2.gte(min).lte(max);
}
function stringColumnToSchema(column, z2, coerce2) {
  if (isColumnType(column, ["PgUUID"])) {
    return z2.uuid();
  }
  let max;
  let regex;
  let fixed = false;
  if (isColumnType(column, ["PgVarchar", "SQLiteText"])) {
    max = column.length;
  } else if (isColumnType(column, ["MySqlVarChar", "SingleStoreVarChar"])) {
    max = column.length ?? CONSTANTS.INT16_UNSIGNED_MAX;
  } else if (isColumnType(column, ["MySqlText", "SingleStoreText"])) {
    if (column.textType === "longtext") {
      max = CONSTANTS.INT32_UNSIGNED_MAX;
    } else if (column.textType === "mediumtext") {
      max = CONSTANTS.INT24_UNSIGNED_MAX;
    } else if (column.textType === "text") {
      max = CONSTANTS.INT16_UNSIGNED_MAX;
    } else {
      max = CONSTANTS.INT8_UNSIGNED_MAX;
    }
  }
  if (isColumnType(column, [
    "PgChar",
    "MySqlChar",
    "SingleStoreChar"
  ])) {
    max = column.length;
    fixed = true;
  }
  if (isColumnType(column, ["PgBinaryVector"])) {
    regex = /^[01]+$/;
    max = column.dimensions;
  }
  let schema2 = coerce2 === true || coerce2?.string ? z2.coerce.string() : z2.string();
  schema2 = regex ? schema2.regex(regex) : schema2;
  return max && fixed ? schema2.length(max) : max ? schema2.max(max) : schema2;
}
function getColumns(tableLike) {
  return isTable(tableLike) ? getTableColumns(tableLike) : getViewSelectedFields(tableLike);
}
function handleColumns(columns, refinements, conditions, factory) {
  const columnSchemas = {};
  for (const [key, selected] of Object.entries(columns)) {
    if (!is(selected, Column) && !is(selected, SQL) && !is(selected, SQL.Aliased) && typeof selected === "object") {
      const columns2 = isTable(selected) || isView(selected) ? getColumns(selected) : selected;
      columnSchemas[key] = handleColumns(columns2, refinements[key] ?? {}, conditions);
      continue;
    }
    const refinement = refinements[key];
    if (refinement !== void 0 && typeof refinement !== "function") {
      columnSchemas[key] = refinement;
      continue;
    }
    const column = is(selected, Column) ? selected : void 0;
    const schema2 = column ? columnToSchema(column) : any();
    const refined = typeof refinement === "function" ? refinement(schema2) : schema2;
    if (conditions.never(column)) {
      continue;
    } else {
      columnSchemas[key] = refined;
    }
    if (column) {
      if (conditions.nullable(column)) {
        columnSchemas[key] = columnSchemas[key].nullable();
      }
      if (conditions.optional(column)) {
        columnSchemas[key] = columnSchemas[key].optional();
      }
    }
  }
  return object(columnSchemas);
}
const insertConditions = {
  never: (column) => column?.generated?.type === "always" || column?.generatedIdentity?.type === "always",
  optional: (column) => !column.notNull || column.notNull && column.hasDefault,
  nullable: (column) => !column.notNull
};
const createInsertSchema = (entity, refine2) => {
  const columns = getColumns(entity);
  return handleColumns(columns, {}, insertConditions);
};
const corpusDocumentsTable = pgTable(
  "corpus_documents",
  {
    id: text("id").primaryKey(),
    fundSlug: text("fund_slug").notNull(),
    docType: text("doc_type").notNull(),
    sourceUrl: text("source_url").notNull(),
    contentHash: text("content_hash").notNull(),
    title: text("title"),
    extractedText: text("extracted_text").notNull(),
    contentType: text("content_type"),
    fetchedAt: timestamp("fetched_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (t) => ({
    // Dedupe per fund so two funds may legitimately reference the same
    // source document without losing the per-fund linkage.
    fundHashUnique: uniqueIndex("corpus_documents_fund_hash_idx").on(
      t.fundSlug,
      t.contentHash
    ),
    fundIdx: index$2("corpus_documents_fund_idx").on(t.fundSlug),
    fundTypeIdx: index$2("corpus_documents_fund_type_idx").on(t.fundSlug, t.docType)
  })
);
const insertCorpusDocumentSchema = createInsertSchema(corpusDocumentsTable).omit({
  createdAt: true
});
const DOC_TYPES = [
  "ordinance",
  "audit",
  "financial-report",
  "council-minute",
  "news"
];
const agentOutputsTable = pgTable(
  "agent_outputs",
  {
    id: text("id").primaryKey(),
    fundSlug: text("fund_slug").notNull(),
    workProductType: text("work_product_type").notNull(),
    modelVersion: text("model_version").notNull(),
    promptVersion: text("prompt_version").notNull(),
    corpusSnapshotHash: text("corpus_snapshot_hash").notNull(),
    renderedMarkdown: text("rendered_markdown").notNull(),
    citationReport: text("citation_report"),
    pdfObjectPath: text("pdf_object_path"),
    blueskyPostUri: text("bluesky_post_uri"),
    status: text("status").notNull().default("pending"),
    attemptCount: integer$1("attempt_count").notNull().default(1),
    errorMessage: text("error_message"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (t) => ({
    fundIdx: index$2("agent_outputs_fund_idx").on(t.fundSlug),
    fundProductIdx: index$2("agent_outputs_fund_product_idx").on(t.fundSlug, t.workProductType)
  })
);
const insertAgentOutputSchema = createInsertSchema(agentOutputsTable).omit({
  createdAt: true
});
const WORK_PRODUCT_TYPES = ["weekly-memo", "monthly-cash-flow"];
const OUTPUT_STATUSES = ["pending", "succeeded", "failed", "skipped"];
const scheduledRunsTable = pgTable(
  "scheduled_runs",
  {
    id: text("id").primaryKey(),
    jobName: text("job_name").notNull(),
    fundSlug: text("fund_slug"),
    workProductType: text("work_product_type"),
    status: text("status").notNull().default("running"),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    fundsProcessed: integer$1("funds_processed").notNull().default(0),
    fundsSucceeded: integer$1("funds_succeeded").notNull().default(0),
    fundsFailed: integer$1("funds_failed").notNull().default(0),
    notes: text("notes")
  },
  (t) => ({
    jobIdx: index$2("scheduled_runs_job_idx").on(t.jobName),
    startedIdx: index$2("scheduled_runs_started_idx").on(t.startedAt)
  })
);
const insertScheduledRunSchema = createInsertSchema(scheduledRunsTable);
const RUN_STATUSES = ["running", "succeeded", "failed", "partial"];
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DOC_TYPES,
  OUTPUT_STATUSES,
  RUN_STATUSES,
  WORK_PRODUCT_TYPES,
  agentOutputsTable,
  corpusDocumentsTable,
  insertAgentOutputSchema,
  insertCorpusDocumentSchema,
  insertScheduledRunSchema,
  scheduledRunsTable
}, Symbol.toStringTag, { value: "Module" }));
const { Pool } = pg;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });
const WEEKLY_MEMO_FILES = /* @__PURE__ */ Object.assign({
  "/src/content/funds/pcef/latest-memo.md": __vite_glob_0_0,
  "/src/content/funds/rental-services/latest-memo.md": __vite_glob_0_1
});
const CASH_FLOW_FILES = /* @__PURE__ */ Object.assign({});
function readMarkdown(fundSlug, type) {
  const map2 = type === "weekly-memo" ? WEEKLY_MEMO_FILES : CASH_FLOW_FILES;
  const file2 = type === "weekly-memo" ? "latest-memo.md" : "latest-cash-flow.md";
  const key = `/src/content/funds/${fundSlug}/${file2}`;
  return map2[key] ?? null;
}
function renderMarkdown(md) {
  marked.setOptions({ gfm: true, breaks: false });
  const html = marked.parse(md, { async: false });
  return DOMPurify.sanitize(html);
}
async function latestSucceeded(fundSlug, type) {
  const rows = await db.select().from(agentOutputsTable).where(
    and(
      eq(agentOutputsTable.fundSlug, fundSlug),
      eq(agentOutputsTable.workProductType, type),
      eq(agentOutputsTable.status, "succeeded")
    )
  ).orderBy(desc(agentOutputsTable.publishedAt), desc(agentOutputsTable.createdAt)).limit(1);
  return rows[0] ?? null;
}
async function loadMemo(fundSlug, type) {
  const markdown = readMarkdown(fundSlug, type);
  if (!markdown) return null;
  const output = await latestSucceeded(fundSlug, type);
  return {
    workProductType: type,
    markdown,
    html: renderMarkdown(markdown),
    output
  };
}
async function loadRunHistory(fundSlug, limit = 8) {
  const rows = await db.select().from(agentOutputsTable).where(eq(agentOutputsTable.fundSlug, fundSlug)).orderBy(desc(agentOutputsTable.createdAt)).limit(limit);
  return rows.map((r) => ({
    id: r.id,
    workProductType: r.workProductType,
    status: r.status,
    modelVersion: r.modelVersion,
    promptVersion: r.promptVersion,
    publishedAt: r.publishedAt,
    createdAt: r.createdAt,
    attemptCount: r.attemptCount
  }));
}
function firstParagraphHtml(markdown) {
  const lines = markdown.split("\n");
  const buf = [];
  let headingsSeen = 0;
  for (const line of lines) {
    const isH = line.startsWith("## ") || line.startsWith("# ");
    if (isH) {
      headingsSeen += 1;
      if (headingsSeen === 1 || headingsSeen === 2) continue;
      break;
    }
    if (headingsSeen < 2) continue;
    buf.push(line);
    if (buf.join("\n").length > 360) break;
  }
  let md = buf.join("\n").trim();
  if (!md) {
    md = markdown.split("\n").filter((l) => !l.startsWith("#") && l.trim() !== "---").join("\n").trim().slice(0, 360);
  }
  if (!md) return "";
  return renderMarkdown(md);
}
function headlineFrom(markdown) {
  const m = markdown.match(/^##\s+Headline\s*\n+([^\n]+)/m);
  return m ? m[1].trim() : null;
}
async function loadLatestWeeklyAcrossFunds(fundSlugs) {
  const results = await Promise.all(
    fundSlugs.map(async (slug) => {
      const memo = await loadMemo(slug, "weekly-memo");
      if (!memo || !memo.output) return null;
      return {
        fundSlug: slug,
        output: memo.output,
        excerptHtml: firstParagraphHtml(memo.markdown),
        headline: headlineFrom(memo.markdown)
      };
    })
  );
  return results.filter((r) => r !== null).sort((a, b) => {
    const da = a.output.publishedAt ?? a.output.createdAt;
    const db_ = b.output.publishedAt ?? b.output.createdAt;
    return db_.getTime() - da.getTime();
  });
}
export {
  loadMemo as a,
  loadRunHistory as b,
  loadLatestWeeklyAcrossFunds as l
};
