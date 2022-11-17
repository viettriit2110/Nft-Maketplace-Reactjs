import React from "react";
import TransactionInfo from "./TransactionInfo";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const History = ({ transactions, payableToken }) => {
  return (
    <Tabs>
      <div className="flat-tabs themesflat-tabs">
        <TabList className="menu-tab tab-title">
          <Tab className="item-title">
            <span className="inner">Sell History</span>
          </Tab>
          <Tab className="item-title">
            <span className="inner">Info</span>
          </Tab>
        </TabList>

        <div className="content-tab">
          <TabPanel>
            <div className="content-inner tab-content">
              {transactions.length ? (
                <ul className="bid-history-list">
                  {transactions.map((trans) => (
                    <li key={trans.id}>
                      <TransactionInfo
                        data={trans}
                        payableToken={payableToken}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="content-inner tab-content">
              <div className="provenance">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </TabPanel>
        </div>
      </div>
    </Tabs>
  );
};

History.defaultProps = {
  transactions: [],
};
export default History;
