import { Component, type ReactNode } from 'react';

interface RemoteBoundaryProps {
  label: string;
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
          {this.props.label} is unavailable right now. The rest of EventBank keeps working; reload the page to try
          again.
        </p>
      </div>
    );
  }
}
