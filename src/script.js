class justAccordion {
  constructor( selector, options ) {
    const defaultOptions = {
      isOpen: () => {},
      isClose: () => {},
      speed: 300,
      showFirst: false,
      showOnlyOne: false,
      activeHandlerClass: null,
      activeContentClass: null,

    }
    this.options = Object.assign( defaultOptions, options );
    this.selector = selector;
    this.accordions = document.querySelector( selector );
    if ( this.accordions ) {
      this.accordionsHandlers = this.accordions.querySelectorAll( '.accordion__control' );
      this.accordionsContents = this.accordions.querySelectorAll( '.accordion__content' );
    } else {
      console.error( `Selector "${this.selector} not found` );
      return;
    }

    this.check();
    this.init();
    this.events();
  }

  check() {
    if ( document.querySelectorAll( this.selector ).length > 1 ) {
      console.error( `Selector "${this.selector}" already exists!` );
      return;
    }
  }

  init() {
    this.accordionsHandlers.forEach( ( el ) => {
      el.setAttribute( 'aria-expanded', false );
      if ( this.options.activeHandlerClass !== null ) {
        el.classList.remove( this.options.activeHandlerClass );
      }
    } );

    this.accordionsContents.forEach( ( el ) => {
      el.setAttribute( 'aria-hidden', true );
      el.style.setProperty( '--accordion-time', `${this.options.speed / 1000}s` );
      if ( this.options.activeContentClass !== null ) {
        el.classList.remove( this.options.activeContentClass );
      }
    } );

    if ( this.options.showFirst ) {
      this.accordionsHandlers[ 0 ].classList.add( 'accordion__control--open' );
      this.accordionsHandlers[ 0 ].setAttribute( 'aria-expanded', true );
      this.accordionsContents[ 0 ].style.maxHeight = this.accordionsContents[ 0 ].scrollHeight + 'px';
      this.accordionsContents[ 0 ].setAttribute( 'aria-hidden', false );
      if ( this.options.activeHandlerClass !== null ) {
        this.accordionsHandlers[ 0 ].classList.add( this.options.activeHandlerClass );
      }
      if ( this.options.activeContentClass !== null ) {
        this.accordionsContents[ 0 ].classList.add( this.options.activeContentClass );
      }
    }
  }

  events() {
    this.accordionsHandlers.forEach( ( el ) => {
      el.addEventListener( 'click', ( event ) => {
        if ( !event.currentTarget.classList.contains( 'accordion__control--open' ) ) {
          this.options.showOnlyOne ? this.toggle( event.currentTarget ) : this.open( event.currentTarget );
        } else {
          this.close( event.currentTarget );
        }
      } );
    } );
  }

  open( target ) {
    let index = Array.prototype.indexOf.call( this.accordionsHandlers, target );
    target.classList.add( 'accordion__control--open' );
    target.setAttribute( 'aria-expanded', true );
    this.accordionsContents[ index ].style.maxHeight = this.accordionsContents[ index ].scrollHeight + 'px';
    this.accordionsContents[ index ].setAttribute( 'aria-hidden', false );
    if ( this.options.activeHandlerClass !== null ) {
      target.classList.add( this.options.activeHandlerClass );
    }
    if ( this.options.activeContentClass !== null ) {
      this.accordionsContents[ index ].classList.add( this.options.activeContentClass );
    }
    this.options.isOpen( this );
  }

  close( target ) {
    let index = Array.prototype.indexOf.call( this.accordionsHandlers, target );
    target.classList.remove( 'accordion__control--open' );
    target.setAttribute( 'aria-expanded', false );
    this.accordionsContents[ index ].style.maxHeight = null;
    this.accordionsContents[ index ].setAttribute( 'aria-hidden', true );
    if ( this.options.activeHandlerClass !== null ) {
      target.classList.remove( this.options.activeHandlerClass );
    }
    if ( this.options.activeContentClass !== null ) {
      this.accordionsContents[ index ].classList.remove( this.options.activeContentClass );
    }
    this.options.isClose( this );
  }

  toggle( target ) {
    let index = Array.prototype.indexOf.call( this.accordionsHandlers, target );

    this.accordionsHandlers.forEach( ( el ) => {
      el.setAttribute( 'aria-expanded', false );
      el.classList.remove( 'accordion__control--open' );
      if ( this.options.activeHandlerClass !== null ) {
        el.classList.remove( this.options.activeHandlerClass );
      }
    } );

    this.accordionsContents.forEach( ( el ) => {
      el.setAttribute( 'aria-hidden', true );
      el.style.maxHeight = null;
      if ( this.options.activeContentClass !== null ) {
        el.classList.remove( this.options.activeContentClass );
      }
    } );

    target.classList.add( 'accordion__control--open' );
    target.setAttribute( 'aria-expanded', true );
    this.accordionsContents[ index ].style.maxHeight = this.accordionsContents[ index ].scrollHeight + 'px';
    this.accordionsContents[ index ].style.setProperty( '--accordion-time', `${this.options.speed / 1000}s` );
    this.accordionsContents[ index ].setAttribute( 'aria-hidden', false );
    if ( this.options.activeHandlerClass !== null ) {
      target.classList.add( this.options.activeHandlerClass );
    }
    if ( this.options.activeContentClass !== null ) {
      this.accordionsContents[ index ].classList.add( this.options.activeContentClass );
    }
    this.options.isOpen( this );
  }
}
