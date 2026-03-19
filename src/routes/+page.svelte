<script lang="ts">
  const SLOT_COUNT = 6;
  let activeSlot: number | null = $state(null);

  const pokeballSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
       class="text-secondary" style="opacity:.25" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M8 4a4 4 0 0 0-3.866 2.998h7.732A4 4 0 0 0 8 4M4.134 9.002a4.002 4.002 0 0 0 7.732 0zM7.5 9.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0"/>
  </svg>`;

  function selectSlot(index: number) {
    activeSlot = activeSlot === index ? null : index;
  }

  function closeSetup() {
    activeSlot = null;
  }
</script>

<div class="container-lg">

  <!-- Header -->
  <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <div class="col-md-3 mb-2 mb-md-0">
      <a href="/" class="d-inline-flex align-items-center link-body-emphasis text-decoration-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M8 4a4 4 0 0 0-3.866 2.998h7.732A4 4 0 0 0 8 4M4.134 9.002a4.002 4.002 0 0 0 7.732 0zM7.5 9.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0" />
        </svg>
        <span class="ms-2 fs-5 fw-semibold">Pokémon Team Builder</span>
      </a>
    </div>
    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li><a href="/" class="nav-link px-2 link-secondary">My Team</a></li>
    </ul>
    <div class="col-md-3 text-end">
      <button type="button" class="btn btn-outline-primary btn-sm me-2">Login</button>
      <button type="button" class="btn btn-primary btn-sm">Sign up</button>
    </div>
  </header>

  <!-- Main layout -->
  <div class="row g-4">

    <!-- Team Editor -->
    <div class="col-lg-8">
      <h5 class="mb-3">My Pokémon Team</h5>

      <!-- 6 slot cards -->
      <div class="row g-2">
        {#each Array.from({ length: SLOT_COUNT }, (_, i) => i) as i}
          <div class="col-4 col-md-2">
            <div
              class="pokemon-slot card text-center h-100{activeSlot === i ? ' active' : ''}"
              role="button"
              tabindex="0"
              aria-label="Slot {i + 1}{activeSlot === i ? ' (open)' : ''}"
              onclick={() => selectSlot(i)}
              onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectSlot(i); } }}
            >
              <div class="card-body p-2 d-flex flex-column align-items-center justify-content-center gap-1">
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html pokeballSvg}
                <small class="text-muted">Slot {i + 1}</small>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Setup panel -->
      {#if activeSlot !== null}
        <div class="card mt-3">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span class="fw-semibold">Slot {activeSlot + 1} — Setup</span>
            <button type="button" class="btn-close" aria-label="Close" onclick={closeSetup}></button>
          </div>
          <div class="card-body">
            <div class="row g-3">

              <!-- Sprite + search -->
              <div class="col-sm-3 text-center">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
                  alt="Select a Pokémon"
                  class="setup-sprite-img mb-2"
                />
                <input type="text" class="form-control form-control-sm" placeholder="Search Pokémon…" />
              </div>

              <!-- Item / Ability / Nature -->
              <div class="col-sm-3">
                <div class="mb-2">
                  <label for="input-item-{activeSlot}" class="form-label small mb-1">Item</label>
                  <input id="input-item-{activeSlot}" type="text" class="form-control form-control-sm" placeholder="Held item" />
                </div>
                <div class="mb-2">
                  <label for="input-ability-{activeSlot}" class="form-label small mb-1">Ability</label>
                  <input id="input-ability-{activeSlot}" type="text" class="form-control form-control-sm" placeholder="Ability" />
                </div>
                <div>
                  <label for="select-nature-{activeSlot}" class="form-label small mb-1">Nature</label>
                  <select id="select-nature-{activeSlot}" class="form-select form-select-sm">
                    <option value="">— Select —</option>
                    {#each ['Hardy','Lonely','Brave','Adamant','Naughty','Bold','Docile','Relaxed','Impish','Lax','Timid','Hasty','Serious','Jolly','Naive','Modest','Mild','Quiet','Bashful','Rash','Calm','Gentle','Sassy','Careful','Quirky'] as nature}
                      <option>{nature}</option>
                    {/each}
                  </select>
                </div>
              </div>

              <!-- Moves -->
              <div class="col-sm-6">
                <label for="input-move1-{activeSlot}" class="form-label small mb-1">Moves</label>
                <input id="input-move1-{activeSlot}" type="text" class="form-control form-control-sm mb-1" placeholder="Move 1" />
                <input aria-label="Move 2" type="text" class="form-control form-control-sm mb-1" placeholder="Move 2" />
                <input aria-label="Move 3" type="text" class="form-control form-control-sm mb-1" placeholder="Move 3" />
                <input aria-label="Move 4" type="text" class="form-control form-control-sm" placeholder="Move 4" />
              </div>

            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Team Analysis -->
    <div class="col-lg-4">
      <h5 class="mb-3">Team Analysis</h5>
      <div class="card mb-3">
        <div class="card-body">
          <h6 class="card-title text-danger mb-2">Weaknesses</h6>
          <div class="d-flex flex-wrap gap-1">
            <span class="text-muted small">Add Pokémon to see weaknesses.</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h6 class="card-title text-success mb-2">Resistances</h6>
          <div class="d-flex flex-wrap gap-1">
            <span class="text-muted small">Add Pokémon to see resistances.</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
