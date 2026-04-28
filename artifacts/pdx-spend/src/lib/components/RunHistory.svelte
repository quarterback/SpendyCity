<script lang="ts">
  interface Entry {
    id: string;
    workProductType: string;
    status: string;
    modelVersion: string;
    promptVersion: string;
    publishedAt: Date | null;
    createdAt: Date;
    attemptCount: number;
    pdfUrl: string | null;
  }
  interface Props {
    runs: Entry[];
  }
  let { runs }: Props = $props();

  function fmt(d: Date | null | undefined): string {
    if (!d) return '—';
    return new Date(d).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  function product(t: string): string {
    if (t === 'weekly-memo') return 'Weekly memo';
    if (t === 'monthly-cash-flow') return 'Monthly cash-flow';
    return t;
  }
</script>

{#if runs.length > 0}
  <section class="container run-history">
    <p class="kicker">RUN HISTORY · LAST {runs.length}</p>
    <h2 class="section-title">Prior agent runs</h2>
    <p class="section-deck">
      Each row is one invocation of the structured-finance prompt. Failed runs
      are kept on the record so the cadence is auditable.
    </p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Work product</th>
            <th>Status</th>
            <th>Model</th>
            <th>Prompt</th>
            <th>Attempts</th>
            <th>Artifact</th>
          </tr>
        </thead>
        <tbody>
          {#each runs as r}
            <tr>
              <td>{fmt(r.publishedAt ?? r.createdAt)}</td>
              <td>{product(r.workProductType)}</td>
              <td><span class="status status-{r.status}">{r.status}</span></td>
              <td><code>{r.modelVersion}</code></td>
              <td><code>{r.promptVersion}</code></td>
              <td>{r.attemptCount}</td>
              <td>
                {#if r.pdfUrl}
                  <a href={r.pdfUrl} download>PDF</a>
                {:else}
                  —
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
{/if}

<style>
  .run-history {
    margin-top: 48px;
    padding-top: 32px;
    border-top: 1px solid var(--rule, #d4cfc4);
  }
  .table-wrap {
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }
  th,
  td {
    border-bottom: 1px solid var(--rule, #d4cfc4);
    padding: 8px 10px;
    text-align: left;
    vertical-align: top;
  }
  th {
    font-weight: 600;
    color: var(--ink-muted, #6b6357);
    border-bottom-width: 2px;
  }
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
  }
  .status {
    display: inline-block;
    padding: 1px 8px;
    border-radius: 999px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .status-succeeded {
    background: #e7efe2;
    color: #2c4d23;
  }
  .status-failed {
    background: #f4dcd1;
    color: #7a2c0a;
  }
  .status-skipped {
    background: #ede9df;
    color: #5d564a;
  }
  .status-pending {
    background: #fdf3d8;
    color: #6b5400;
  }
</style>
