/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useTranslationClient } from "@/i18n/client";
import React, { useEffect, useRef, useState } from "react";
import { convertMoney } from "../home/constant";
import { formatNumber } from "@/utils/format";
import dayjs from "@/lib/dayjs";
import { ResponseChart } from "@/types/merchant";
import { useSearchParams } from "next/navigation";
import useSwapStore from "@/stores/swap.store";
import dynamic from "next/dynamic";
import Tooltip from "../common/Tooltip";
import QuestionIcon from "../common/Icons/QuestionIcon";

const MerchantChart = dynamic(() => import("./MerchantCharts"), { ssr: false });

type TProps = {
  total_volume: number;
  total_trading: number;
  total_user: number;
  updated_at: string;
  dataChart: ResponseChart;
  total_fee: number;
};

const MerchantPool = ({
  total_volume,
  total_trading,
  total_user,
  updated_at,
  dataChart,
  total_fee,
}: TProps) => {
  const params = useSearchParams();
  const range = params.get("range");
  const [filter, setFilter] = useState(range || "w");
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLButtonElement | null>(null);
  const popupFilterRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslationClient("merchant");
  const [loadMarketPrice, marketPrice] = useSwapStore((state) => [
    state.loadMarketPrice,
    state.marketPrice,
  ]);
  useEffect(() => {
    if (!marketPrice) {
      loadMarketPrice();
    }
  }, [marketPrice]);
  return (
    <div className="w-full  px-4 lg:px-0">
      <div className="mb-5 mt-[80px] flex w-full items-center justify-between lg:mb-10 lg:mt-[100px]">
        <div className="w-full text-center">
          <span
            className="font-sf-pro-expanded text-mb-large font-bold"
            dangerouslySetInnerHTML={{ __html: t("merchant:merchant_pool") }}
          ></span>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-start gap-y-5 lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-x-[30px]">
        <div className="col-span-1 flex h-full w-full flex-col items-start justify-start gap-y-5">
          <div className="w-full">
            <div className="mx-10 h-4 rounded-t-xxl bg-white opacity-30 "></div>
            <div className="mx-4 h-4 rounded-t-xxl bg-white opacity-50 "></div>
            <div className="flex w-full flex-col rounded-xxl bg-white">
              <div className="flex flex-col items-start gap-y-3 border-b border-dark-4/20 px-4 py-[30px]">
                <p className="font-semibold text-dark-4 flex items-center gap-x-2">
                  {t("merchant:trading_volume")}{" "}
                  <Tooltip
                    content={t("merchant:tooltip_total_volume")}
                    showArrow={false}
                  >
                    <QuestionIcon />
                  </Tooltip>
                </p>
                <p className="text-gradient-1 font-sf-pro-expanded text-2xl font-bold leading-6 flex items-center gap-x-2">
                  {formatNumber(total_volume, 0)}{" "}
                  <img
                    src="/assets/images/cryptos/vnst.png"
                    className="w-8 h-8"
                  />
                </p>
                <p className="text-xs font-semibold text-dark-3">
                  {convertMoney("VNST", marketPrice || 24000, total_volume)}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mt-2.5">
            <div className="mx-10 h-4 rounded-t-xxl bg-white opacity-30 "></div>
            <div className="mx-4 h-4 rounded-t-xxl bg-white opacity-50 "></div>
            <div className="flex w-full flex-col rounded-xxl bg-white">
              <div className="flex flex-col items-start gap-y-3 px-4 py-[30px]">
                <p className="font-semibold text-dark-4 flex items-center gap-x-2">
                  {t("merchant:total_trading")}{" "}
                  <Tooltip content={t("merchant:tooltip_total_order")}>
                    <QuestionIcon />
                  </Tooltip>
                </p>
                <p className="text-gradient-1 font-sf-pro-expanded text-2xl font-bold leading-6">
                  {formatNumber(total_trading * 2)}
                </p>
              </div>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: t("merchant:time", {
                time: dayjs(updated_at).format("HH:mm DD/MM/YYYY"),
              }),
            }}
            className="w-full text-xs text-dark-4 text-center"
          ></div>
        </div>
        <div className="h-full w-full lg:col-span-2">
          <MerchantChart
            setReferenceElement={setReferenceElement}
            popupRef={popupFilterRef}
            referenceElement={referenceElement}
            filter={filter}
            setFilter={setFilter}
            dataChart={dataChart}
            marketPrice={marketPrice || 24000}
          />
        </div>
      </div>
    </div>
  );
};

export default MerchantPool;
