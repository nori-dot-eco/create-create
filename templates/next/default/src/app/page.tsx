import { Account } from '../components/account';
import { AccountBalance } from '../components/account-balance';
import { UsdcBalance } from '../components/usdc-balance';
import { Connect } from '../components/connect';
import { NetworkSwitcher } from '../components/network-switcher';
import { SendTransaction } from '../components/send-transaction';
import { RealTimeCertificateEventList } from '../components/real-time-certificate-event-list';
import { MarketInfo } from '../components/market-info';
import { PurchaseNrt } from '../components/purchase-nrt';

const Page = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <NetworkSwitcher />
        <Account />
        <Connect />
      </div>
      <hr />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '1rem',
          padding: '1rem',
          margin: 'auto',
          width: '50%',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(245, 245, 245, .75)',
            borderRadius: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>Balances</h2>
          <div>
            <UsdcBalance />
          </div>
          <div>
            <AccountBalance />
          </div>
        </div>
        <div
          style={{
            backgroundColor: 'rgba(245, 245, 245, .75)',
            borderRadius: '1rem',
            padding: '1rem',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div
            style={{
              borderRadius: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div>
              <h2 style={{ textAlign: 'center', padding: '1rem' }}>
                Nori Integration Example
              </h2>
            </div>
            <div
              style={{
                padding: '1rem',
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(245, 245, 245, .75)',
                  borderRadius: '1rem',
                  padding: '1rem',
                  color: '#ff7f50',
                }}
              >
                <h3>
                  NRTs available: <MarketInfo />
                </h3>
              </div>
            </div>
            <div>
              <PurchaseNrt />
            </div>
          </div>
          <div
            style={{
              borderRadius: '1rem',
              padding: '1rem',
              outline: 'none',
              boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ padding: '1rem' }}>
              <div>
                <h4>Certificate Creation Events</h4>
                <RealTimeCertificateEventList eventName="CreateCertificate" />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div
          style={{
            backgroundColor: 'rgba(245, 245, 245, .75)',
            borderRadius: '1rem',
            padding: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <h4 style={{ textAlign: 'center' }}>Send a Custom Transaction</h4>
          <div
            style={{
              padding: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <SendTransaction />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
