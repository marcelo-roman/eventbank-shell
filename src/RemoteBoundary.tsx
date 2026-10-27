import { Component, type ReactNode } from 'react';

interface RemoteBoundaryProps {
  unavailable: string;
  children: ReactNode;
}

interface RemoteBoundaryState {
  failed: boolean;
}

export class RemoteBoundary extends Component<RemoteBoundaryProps, RemoteBoundaryState> {
  override state: RemoteBoundaryState = { failed: false };

  static getDerivedStateFromError(): RemoteBoundaryState {
    return { failed: true };
  }

  override render() {
    if (!this.state.failed) {
      return this.props.children;
    }
    return (
      <div className="page">
        <p className="error" role="alert">
          {this.props.unavailable}
        </p>
      </div>
    );
  }
}
