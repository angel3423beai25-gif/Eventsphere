import { Component } from 'react';

// Shows the real error on screen instead of a blank white page.
export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', padding: 24, maxWidth: 720, margin: '40px auto' }}>
        <h1>Something went wrong</h1>
        <p>Try refreshing the page. If it keeps happening, clear the site data (F12 &gt; Application &gt; Clear storage) and reload.</p>
        <pre style={{ background: '#f3f3f3', color: '#900', padding: 12, overflow: 'auto' }}>{String(this.state.error)}</pre>
        <button type="button" onClick={() => { localStorage.clear(); window.location.reload(); }}>Reset app data and reload</button>
      </div>
    );
  }
}
