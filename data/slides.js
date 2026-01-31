/**
 * slides.js - Slide data for POV interactive app
 *
 * Each slide supports: text, choices.
 * Slides may include:
 *   - onEnter(gameState) — run when the slide is shown (e.g. unlock Credit, complete episodes)
 *   - choices[].effect — { type: "addIncome"|"spendMoney"|"transferToSavings", amount }
 *
 * Facts are now unlocked as achievements when episodes are completed.
 */

const SLIDES = {
  intro: {
    id: "intro",
    text: "You wake up on a Monday morning. Your phone buzzes with a notification from your bank. What do you do?",
    background: "/assets/slides/bank.png",
    choices: [
      { label: "Check the notification immediately", nextSlideId: "check-bank" },
      { label: "Ignore it and go back to sleep", nextSlideId: "ignore-bank" },
    ],
  },

  "check-bank": {
    id: "check-bank",
    text: "You open the app and see your balance. It's lower than expected. A few subscriptions have renewed. Do you review them now?",
    background: "/assets/slides/graduation.png",
    choices: [
      { label: "Review subscriptions now", nextSlideId: "review-subs" },
      { label: "Browse car listings instead", nextSlideId: "car_browsing_scene" },
      { label: "Deal with it later", nextSlideId: "intro" },
    ],
  },

  "ignore-bank": {
    id: "ignore-bank",
    text: "You roll over and close your eyes. Later that week, you're surprised by an overdraft fee. Maybe you should have checked after all.",
    background: "placeholder-ignore",
    choices: [
      { label: "Start over and check the notification", nextSlideId: "intro" },
      { label: "Accept your fate and move on", nextSlideId: "check-bank" },
    ],
  },

  "review-subs": {
    id: "review-subs",
    text: "You scroll through your subscriptions. Gym, streaming, cloud storage... They add up. Time to make some decisions.",
    background: "placeholder-review",
    onEnter: function (gameState) {
      // Complete Episode 1 when reaching this slide
      if (typeof completeEpisode === "function") {
        completeEpisode(1);
      }
    },
    choices: [
      { label: "Cancel at least one subscription", nextSlideId: "intro", effect: { type: "addIncome", amount: 120 } },
      { label: "Keep them all for now", nextSlideId: "car_browsing_scene" },
    ],
  },

  // Unlocks Credit in the metrics bar via onEnter
  car_browsing_scene: {
    id: "car_browsing_scene",
    text: "You open a car marketplace. That used sedan looks within reach if you keep saving. Your credit will matter when you're ready to finance.",
    background: "placeholder-review",
    onEnter: function (gameState) {
      gameState.hasSeenCarBrowsingScene = true;
      gameState.creditVisible = true;
      // Complete Episode 2 when reaching this slide
      if (typeof completeEpisode === "function") {
        completeEpisode(2);
      }
    },
    choices: [
      { label: "Set a savings goal and go back", nextSlideId: "intro", effect: { type: "transferToSavings", amount: 200 } },
      { label: "Just browsing for now", nextSlideId: "check-bank" },
    ],
  },
};
