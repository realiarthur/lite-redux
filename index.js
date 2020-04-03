import { bindActionCreators } from "redux";

export default store => (mapStateToProps, mapDispatchToProps) => Component =>
  class Connect extends Component {
    constructor(props) {
      super(props);
      this._getPropsFromStore(mapStateToProps);
      this._inheritChainProps = (this._inheritChainProps || []).concat(
        mapStateToProps
      );
    }

    _getPropsFromStore = mapStateToProps => {
      if (!mapStateToProps) return;
      const state = store.getState();
      const props = mapStateToProps(state);

      for (const prop in props) {
        this[prop] = props[prop];
      }
    };

    _getInheritChainProps = () => {
      this._inheritChainProps.forEach(i => this._getPropsFromStore(i));
    };

    connectedCallback() {
      super.connectedCallback();

      this._unsubscriber = store.subscribe(this._getInheritChainProps);

      if (!mapDispatchToProps) return;

      const dispatchers =
        typeof mapDispatchToProps === "function"
          ? mapDispatchToProps(store.dispatch)
          : mapDispatchToProps;
      for (const dispatcher in dispatchers) {
        typeof mapDispatchToProps === "function"
          ? (this[dispatcher] = dispatchers[dispatcher])
          : (this[dispatcher] = bindActionCreators(
              dispatchers[dispatcher],
              store.dispatch,
              () => store.getState()
            ));
      }
    }

    disconnectedCallback() {
      this._unsubscriber();
      super.disconnectedCallback();
    }
  };
