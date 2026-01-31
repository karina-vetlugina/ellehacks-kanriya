/**
 * game.js - Main game logic for POV interactive app
 *
 * Handles:
 *   - Slide rendering
 *   - Choice handling
 *   - Status bar updates
 *
 * Extensible for:
 *   - Real financial logic
 *   - ElevenLabs narration
 *   - Animations
 *   - Image loading
 */

/* --------------------------------------------------
   Global state (placeholders - no real logic yet)
   -------------------------------------------------- */
const state = {
  currentSlideId: "intro",
  money: 1000,           // Placeholder
  spentThisWeek: 0,      // Placeholder
};

/* --------------------------------------------------
   DOM references (cached for performance)
   -------------------------------------------------- */
const DOM = {
  backgroundContainer: null,
  dialogueText: null,
  choicesContainer: null,
  moneyDisplay: null,
  spentDisplay: null,
};

/**
 * Initialize DOM references and start the game
 */
function init() {
  DOM.backgroundContainer = document.getElementById("background-container");
  DOM.dialogueText = document.getElementById("dialogue-text");
  DOM.choicesContainer = document.getElementById("choices-container");
  DOM.moneyDisplay = document.getElementById("money-display");
  DOM.spentDisplay = document.getElementById("spent-display");

  if (!SLIDES) {
    console.error("SLIDES data not loaded. Ensure data/slides.js is loaded first.");
    DOM.dialogueText.textContent = "Error: Slide data not found.";
    return;
  }

  updateStatusBar();
  renderSlide(state.currentSlideId);
}

/**
 * Render a slide by ID
 * @param {string} slideId - ID of the slide in SLIDES
 */
function renderSlide(slideId) {
  const slide = SLIDES[slideId];

  if (!slide) {
    console.error(`Slide not found: ${slideId}`);
    DOM.dialogueText.textContent = `Error: Slide "${slideId}" not found.`;
    renderChoices([]);
    return;
  }

  // Update background placeholder (future: load image from slide.background)
  if (DOM.backgroundContainer) {
    DOM.backgroundContainer.style.background = "#2a2a2a";
    DOM.backgroundContainer.setAttribute("data-background", slide.background || "");
  }

  // Update dialogue text
  if (DOM.dialogueText) {
    DOM.dialogueText.textContent = slide.text;
  }

  // Render choice buttons
  renderChoices(slide.choices || []);
}

/**
 * Render choice buttons from a slide's choices array
 * @param {Array<{label: string, nextSlideId: string}>} choices
 */
function renderChoices(choices) {
  if (!DOM.choicesContainer) return;

  DOM.choicesContainer.innerHTML = "";

  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.label;
    btn.dataset.nextSlideId = choice.nextSlideId;

    btn.addEventListener("click", () => {
      handleChoiceClick(choice);
    });

    DOM.choicesContainer.appendChild(btn);
  });
}

/**
 * Handle a choice button click - navigate to next slide
 * @param {{label: string, nextSlideId: string}} choice
 */
function handleChoiceClick(choice) {
  const nextSlideId = choice.nextSlideId;

  // Placeholder: future financial logic would run here
  // e.g., applyMoneyChange(choice.moneyEffect);

  state.currentSlideId = nextSlideId;
  renderSlide(nextSlideId);
  updateStatusBar();
}

/**
 * Update the fixed status bar with current state values
 * Placeholder values - no real financial logic yet
 */
function updateStatusBar() {
  if (DOM.moneyDisplay) {
    DOM.moneyDisplay.textContent = `$${state.money}`;
  }
  if (DOM.spentDisplay) {
    DOM.spentDisplay.textContent = `$${state.spentThisWeek}`;
  }
}

/* --------------------------------------------------
   Start game when DOM is ready
   -------------------------------------------------- */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
