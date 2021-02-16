import React from "react";
import "./../../App.less";
import { Menu } from "antd";
import {
  GithubOutlined,
  HomeOutlined,
  RocketOutlined,
  ForkOutlined,
} from "@ant-design/icons";

import BasicLayout from "@ant-design/pro-layout";
import { AppBar } from "./../AppBar";
import { Link, useLocation } from "react-router-dom";
import { useConnectionConfig } from "../../contexts/connection";
import { LABELS } from "../../constants";
import config from "./../../../package.json";

export const AppLayout = React.memo((props: any) => {
  const { env } = useConnectionConfig();
  const location = useLocation();

  const paths: { [key: string]: string } = {
    "/faucet": "2",
  };

  const current =
    [...Object.keys(paths)].find((key) => location.pathname.startsWith(key)) ||
    "";
  const defaultKey = paths[current] || "1";
  const theme = "dark";

  return (
    <div className="App">
      <div className="Banner">
        <div className="Banner-description">{LABELS.AUDIT_WARNING}</div>
      </div>
      <BasicLayout
        title={LABELS.APP_TITLE}
        footerRender={() => (
          <div className="footer" title={LABELS.FOOTER}>
            {LABELS.FOOTER}
          </div>
        )}
        navTheme={theme}
        headerTheme={theme}
        theme={theme}
        layout="mix"
        fixSiderbar={true}
        primaryColor="#d83aeb"
        logo={<div className="App-logo" />}
        rightContentRender={() => <AppBar />}
        links={[]}
        menuContentRender={() => {
          return (
            <div className="links">
              <Menu
                theme={theme}
                defaultSelectedKeys={[defaultKey]}
                mode="inline"
              >
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <Link
                    to={{
                      pathname: "/",
                    }}
                  >
                    {LABELS.MENU_HOME}
                  </Link>
                </Menu.Item>
                {env !== "mainnet-beta" && (
                  <Menu.Item key="2" icon={<RocketOutlined />}>
                    <Link
                      to={{
                        pathname: "/faucet",
                      }}
                    >
                      {LABELS.MENU_FAUCET}
                    </Link>
                  </Menu.Item>
                )}
              </Menu>
              <Menu
                theme={theme}
                defaultSelectedKeys={[defaultKey]}
                selectable={false}
                mode="inline"
                className="bottom-links"
              >
                <Menu.Item key="16" icon={<ForkOutlined />}>
                  <a
                    title="Fork"
                    href={`${config.repository.url}/fork`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fork
                  </a>
                </Menu.Item>
                ,
                <Menu.Item key="15" icon={<GithubOutlined />}>
                  <a
                    title="Gtihub"
                    href={config.repository.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                </Menu.Item>
              </Menu>
            </div>
          );
        }}
      >
        {props.children}
      </BasicLayout>
    </div>
  );
});
