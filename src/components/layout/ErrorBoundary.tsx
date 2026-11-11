'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="my-6 p-6 rounded-2xl glass-card border border-amber-500/20 bg-amber-500/[0.04] text-center max-w-xl mx-auto">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-slate-100 mb-1">
            {this.props.fallbackTitle || 'Section Temporarily Unavailable'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            {this.props.fallbackMessage ||
              'A non-critical rendering error occurred in this module. The rest of the portfolio remains fully operational.'}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-xs font-mono text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-white/[0.08] cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Section</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
