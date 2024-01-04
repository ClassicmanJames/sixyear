import React, { Fragment, useState, useEffect } from "react";
import MainHeader from "./partials/MainHeader";
import Loading from "@/components/loading/Loading";
import { useSelector } from "react-redux";
type Props = { children: React.ReactNode };
const MainLayout = (props: Props) => {
  const setting = useSelector((state: any) => state.setting);
  return (
    <Fragment>
      {setting.isLoadingScreen && <Loading />}

      <div className="flex justify-center relative">
        <div className="max-xl:w-full w-[390px]">
          <MainHeader />
          {props.children}
        </div>
      </div>
    </Fragment>
  );
};
export default MainLayout;
