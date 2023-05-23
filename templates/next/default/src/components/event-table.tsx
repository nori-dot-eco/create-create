import type { Log } from 'viem';

import { stringify } from '../utils/stringify';

export const EventTable = ({ logs }: { logs: Log[] }) => {
  return (
    <div style={{ textAlign: 'left', padding: '1rem' }}>
      <details open>
        <summary>Event count: {logs.length} </summary>
        {logs.length > 0
          ? logs.reverse().map((log, index) => (
              <table
                key={index}
                style={{
                  borderCollapse: 'collapse',
                  marginBottom: '1rem',
                  border: '1px solid #ccc',
                  padding: '2rem',
                }}
              >
                <thead style={{ backgroundColor: '#f7f7f7' }}>
                  <tr>
                    <th
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        padding: '0.5rem',
                      }}
                    >
                      Field
                    </th>
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '0.5rem',
                      }}
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(log).map(([key, value], i) => (
                    <tr
                      key={key}
                      style={{
                        backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'white',
                      }}
                    >
                      <td
                        style={{
                          fontWeight: 'bold',
                          padding: '0.5rem',
                          border: '1px solid #ccc',
                          maxWidth: '30%',
                        }}
                      >
                        {key}
                      </td>
                      <td
                        style={{
                          padding: '0.5rem',
                          border: '1px solid #ccc',
                          wordWrap: 'break-word',
                          wordBreak: 'break-all',
                          whiteSpace: 'normal',
                        }}
                      >
                        {stringify(value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))
          : 'No events observed yet.'}
      </details>
    </div>
  );
};
