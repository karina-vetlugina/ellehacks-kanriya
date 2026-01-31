/**
 * slides.js - Slide data for POV interactive app
 * 
 * Each slide represents one scene/screen in the story.
 * Structure is designed to extend with:
 *   - image paths (background)
 *   - ElevenLabs narration IDs
 *   - financial effects
 */

const SLIDES = {
  // Example slide 1 - intro
  intro: {
    id: "intro",
    text: "You wake up on a Monday morning. Your phone buzzes with a notification from your bank. What do you do?",
    background: "placeholder-intro",
    choices: [
      { label: "Check the notification immediately", nextSlideId: "check-bank" },
      { label: "Ignore it and go back to sleep", nextSlideId: "ignore-bank" },
    ],
  },

  // Example slide 2 - check bank
  "check-bank": {
    id: "check-bank",
    text: "You open the app and see your balance. It's lower than expected. A few subscriptions have renewed. Do you review them now?",
    background: "placeholder-check",
    choices: [
      { label: "Review subscriptions now", nextSlideId: "review-subs" },
      { label: "Deal with it later", nextSlideId: "intro" },
    ],
  },

  // Example slide 3 - ignore bank
  "ignore-bank": {
    id: "ignore-bank",
    text: "You roll over and close your eyes. Later that week, you're surprised by an overdraft fee. Maybe you should have checked after all.",
    background: "placeholder-ignore",
    choices: [
      { label: "Start over and check the notification", nextSlideId: "intro" },
      { label: "Accept your fate and move on", nextSlideId: "check-bank" },
    ],
  },

  // Example slide 4 - review subs
  "review-subs": {
    id: "review-subs",
    text: "You scroll through your subscriptions. Gym, streaming, cloud storage... They add up. Time to make some decisions.",
    background: "placeholder-review",
    choices: [
      { label: "Cancel at least one subscription", nextSlideId: "intro" },
      { label: "Keep them all for now", nextSlideId: "intro" },
    ],
  },
};
