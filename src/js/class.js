export default class JustAccordion {
  #items = [];
  #activeIndex = null;
  #options = {};

  constructor( name = null, options = {} ) {
    try {
      this.el = JustAccordion.getElement( name );
      this.#options = Object.assign( this.#options, options );
    } catch ( error ) {
      console.error( error );
      return;
    }

    this.#init();
  }

  #init() {
    if ( !this.el.classList.contains('is-init') ) {
      this.#setupAccordion();
      this.el.classList.add('is-init');
      this.#onInit();
    } else {
      console.error( 'Accordion already inited!' );
    }
  }

  #open( item ) {
    if(!item) return;
    this.#onOpen( item );

    const content = item.querySelector('.j-accordion-content');
    const currentIndex = Array.prototype.indexOf.call( this.#items, item );

    if ( this.#options.isToggleMode ) {
      if ( this.#activeIndex !== null ) {
        this.#close( this.#items[ this.#activeIndex ] );
      }
      this.#activeIndex = currentIndex;
    }

    item.setAttribute( 'open', '' );
    content.style.maxHeight = `${content.scrollHeight}px`;
    this.#onOpenComplete( item );
  }

  #close( item ) {
    if( !item ) return;
    this.#onClose( item );

    if ( this.#options.isToggleMode ) {
      this.#activeIndex = null;
    }

    const content = item.querySelector('.j-accordion-content');

    // setTimeout(() => {
      content.style.maxHeight = '0';
      content.addEventListener('transitionend', () => {
        item.removeAttribute('open');
        this.#onCloseComplete(item);
      }, { once: true });
    // }, 10);
  }

  #setupAccordion() {
    this.el.classList.add('j-accordion');

    if ( this.#options.duration ) {
      this.el.style.setProperty( '--accordion-duration', `${this.#options.duration / 1000}s` );
    }

    this.el.querySelectorAll('details').forEach( ( item ) => {
      item.classList.add('j-accordion-item');

      if ( this.#options.isToggleMode ) {
        item.removeAttribute( 'open' );
      }

      this.#items.push( item );
      for (const element of item.children) {
        if(element.tagName === 'SUMMARY') {
          element.classList.add('j-accordion-trigger');
          element.addEventListener( 'click', this.#onSummaryClick );
        }
        if(element.tagName === 'DIV') {
          element.classList.add('j-accordion-content');
        }
      }

      if ( item.hasAttribute( 'open' ) ) {
        this.#open( item );
      }
    });

    if ( this.#options.isToggleMode && this.#options.active !==null ) {
      this.#open( this.#items[ this.#options.active ] );
    }
  }

  #onSummaryClick = ( evt ) => {
    evt.preventDefault();
    const item = evt.currentTarget.closest('details');
    if ( this.#options.onClick && ( typeof this.#options.onClick === 'function' ) ) {
      this.#options.onClick( evt.currentTarget, item, this );
    }
    ( item.hasAttribute( 'open' ) ) ? this.#close( item ) : this.#open( item );
  };

  #onInit() {
    if ( this.#options.onInit && ( typeof this.#options.onInit === 'function' ) ) {
      this.#options.onInit(this);
    }
  }

  #onOpen( item ) {
    if ( this.#options.onOpen && ( typeof this.#options.onOpen === 'function' ) ) {
      this.#options.onOpen( item, this );
    }
  }

  #onOpenComplete( item ) {
    if ( this.#options.onOpenComplete && ( typeof this.#options.onOpenComplete === 'function' ) ) {
      this.#options.onOpenComplete( item, this );
    }
  }

  #onClose( item ) {
    if ( this.#options.onClose && ( typeof this.#options.onClose === 'function' ) ) {
      this.#options.onClose( item, this );
    }
  }

  #onCloseComplete( item ) {
    if ( this.#options.onCloseComplete && ( typeof this.#options.onCloseComplete === 'function' ) ) {
      this.#options.onCloseComplete( item, this );
    }
  }

  static getElement( name ) {
    if (name instanceof Element || name instanceof Document) {
      return name;
    }

    if (typeof name === 'string' && name.trim() !== '') {
      const foundElement = document.querySelector( name );
      if ( foundElement ) {
        return foundElement;
      } else {
        throw new Error( `No element found matching selector: ${name}` );
      }
    }

    throw new Error( 'Invalid argument: Expected a selector (string) or HTML element.' );
  }
}
