import { transactions } from '../data/content.js';

export function PhoneFrame({ variant = 'hero' }) {
  const isSavings = variant === 'savings';
  const isTransfer = variant === 'transfer';

  return (
    <div className={`phone-frame phone-${variant}`} aria-label={`NovaPay ${variant} app preview`}>
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-status">
          <span>9:41</span>
          <span>5G</span>
        </div>
        <div className="app-topline">
          <span>{isTransfer ? 'Send' : isSavings ? 'Vault' : 'Balance'}</span>
          <span className="status-dot" />
        </div>
        <div className="balance-block">
          <span>{isTransfer ? 'Transfer ready' : isSavings ? 'Paris studio fund' : 'Available balance'}</span>
          <strong>{isTransfer ? 'EUR 1,850' : isSavings ? '$4,280' : '$18,420.50'}</strong>
        </div>

        {isTransfer ? (
          <div className="transfer-card">
            <div>
              <span>USD</span>
              <strong>$2,000</strong>
            </div>
            <span className="transfer-arrow">→</span>
            <div>
              <span>EUR</span>
              <strong>€1,850</strong>
            </div>
            <small>Arrives in minutes</small>
          </div>
        ) : isSavings ? (
          <div className="goal-panel">
            <div className="goal-ring">
              <span>71%</span>
            </div>
            <div>
              <strong>Automated round-ups</strong>
              <span>$38 moved this week</span>
            </div>
          </div>
        ) : (
          <div className="mini-card">
            <span>NovaPay Black</span>
            <strong>4821</strong>
          </div>
        )}

        <div className="quick-actions" aria-hidden="true">
          <span>Send</span>
          <span>Save</span>
          <span>Cards</span>
        </div>

        <div className="transaction-list">
          {transactions.slice(0, variant === 'hero' ? 4 : 3).map((item) => (
            <div className="transaction-row" key={`${variant}-${item.merchant}`}>
              <span className={`merchant-icon ${item.tone}`} />
              <div>
                <strong>{item.merchant}</strong>
                <span>{item.category}</span>
              </div>
              <b>{item.amount}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NovaCard({ className = '' }) {
  return (
    <div className={`nova-card ${className}`} aria-label="NovaPay premium card mockup">
      <div className="card-top">
        <span>NovaPay</span>
        <span className="contactless" aria-hidden="true" />
      </div>
      <div className="chip" aria-hidden="true" />
      <div className="card-number">4821  ••••  ••••  9084</div>
      <div className="card-bottom">
        <span>RIVER STONE</span>
        <span>09/31</span>
      </div>
    </div>
  );
}
