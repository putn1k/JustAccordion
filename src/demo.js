const accordion = new JustAccordion( '.accordion', {
  speed: 100,
  showFirst: true,
  showOnlyOne: true,
  activeHandlerClass: 'custom-active-class-btn',
  activeContentClass: 'custom-active-class-content',
  isOpen: ( acc ) => {
    console.log( acc );
  },
  isClose: ( acc ) => {
    console.log( acc );
  }
} );
