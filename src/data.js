export const Types = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
};

export const original = [{
  id: 0,
  title: "Embracing Discovery",
  content: [{
    type: Types.TEXT,
    text: "Every creative endeavor requires that you take risks. If you try and don't succeed, you've still learned something. It took Thomas Edison more than 10,000 tries to invent a viable lightbulb. You're not failing. You're discovering what doesn't work."
  }, {
    type: Types.IMAGE,
    src: "coffee_machine.gif",
    alt: "coffee dripping"
  }]
}, {
  id: 1,
  title: "Gaining Insight",
  content: [{
    type: Types.TEXT,
    text: "To spark creativity, feed your brain material like you're cramming for a tough test. Then stop thinking about the problem you want to solve. Go surfing or take a leisurely walk. Research shows that letting your mind wander fosters creativity."
  }, {
    type: Types.TEXT,
    text: "It’s also found that meditation helps you spot and solve problems in creative ways. It promotes divergent thinking that gets novel ideas flowing. According to these studies, meditation also makes you more open to considering new solutions. Time to breathe."
  }]
}, {
  id: 2,
  title: "Making It Real",
  content: [{
    type: Types.TEXT,
    text: "No creative process is truly complete until it manifests a tangible reality. Whether your idea is an action or a physical creation, bringing it to life will likely involve the hard work of iteration, testing, and refinement."
  }, {
    type: Types.TEXT,
    text: "Just be wary of perfectionism. Push yourself to share your creations with others. By maintaining an open stance, you’ll be able to learn from their feedback. Consider their responses new material that you can draw from the next time you’re embarking on a creative endeavor."
  }]
}, {
  id: 3,
  title: "Love the Work",
  content: [{
    type: Types.TEXT,
    text: "Every creative endeavor requires that you take risks. If you try and don't succeed, you've still learned something. It took Thomas Edison more than 10,000 tries to invent a viable lightbulb. You're not failing. You're discovering what doesn't work."
  }, {
    type: Types.IMAGE,
    src: "articulate_logo.png",
    alt: "company logo"
  }]
}, {
  id: 4,
  title: "Have Fun",
  content: [{
    type: Types.TEXT,
    text: "Every creative endeavor requires that you take risks. If you try and don't succeed, you've still learned something. It took Thomas Edison more than 10,000 tries to invent a viable lightbulb. You're not failing. You're discovering what doesn't work."
  }]
}, {
  id: 5,
  title: "",
  content: []
}];

export const originalX3 = original
  .concat(original).concat(original)
  .map((tab, index) => ({
    ...tab,
    title: tab.title+index,
    id: index
  }));

export const minimalContent = [{
  id: 1,
  title: 'a',
  content: [{
    type: Types.TEXT,
    text: "minimal"
  }]
}];

export const variedTabs = [1,2,3,4,5,6,7,8,9,10].map(integer => ({
  id: integer,
  title: integer + ( integer % 2 === 0 ? ' additional text' : '' ),
  content: []
}));

export const longContent = [{
  id: 1,
  title: 'long content',
  content: [{
    type: Types.IMAGE,
    src: "64x64icon.png",
    alt: "small icon"
  }, {
    type: Types.IMAGE,
    src: "articulate_logo.png",
    alt: "logo"
  }, {
    type: Types.TEXT,
    text: "text"
  }, {
    type: Types.IMAGE,
    src: "articulate_logo.png",
    alt: "logo"
  }, {
    type: Types.IMAGE,
    src: "64x64icon.png",
    alt: "small icon"
  }]
}];

export const dualTabs = [{
  id: 1,
  title: "left tab",
  content: []
}, {
  id: 2,
  title: "right tab",
  content: []
}];
