export function MarketsIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9.72477 17.8821C9.32398 17.9594 8.90932 18 8.48478 18C5.03116 18 2.23145 15.3137 2.23145 12C2.23145 8.68629 5.03116 6 8.48478 6C8.90932 6 9.32398 6.04059 9.72477 6.11795M22.2314 12C22.2314 15.3137 19.4317 18 15.9781 18C12.5245 18 9.72477 15.3137 9.72477 12C9.72477 8.68629 12.5245 6 15.9781 6C19.4317 6 22.2314 8.68629 22.2314 12Z"
        stroke={isActive ? '#FFFFFF' : '#686D73'}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PortfolioIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18.2314 9.99999C18.2314 5.58173 14.6497 2 10.2315 1.99997M18.2314 9.99999C18.2314 10 18.2314 9.99999 18.2314 9.99999ZM18.2314 9.99999C18.2314 14.4183 14.6497 18 10.2314 18C5.81317 18 2.23145 14.4183 2.23145 10C2.23145 5.5817 5.81319 1.99994 10.2315 1.99997M18.2314 9.99999L10.2314 10M10.2315 1.99997L10.2314 10M10.2314 10L4.73145 15.5"
        stroke={isActive ? '#FFFFFF' : '#686D73'}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function TradeIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.64862 11.6669L9.14862 8.16691L11.6486 10.6669L14.6486 7.66691M3.89813 17.6667C2.79356 17.6667 1.89813 16.7713 1.89813 15.6667V3.66675C1.89813 2.56218 2.79356 1.66675 3.89813 1.66675H15.8981C17.0027 1.66675 17.8981 2.56218 17.8981 3.66675V15.6667C17.8981 16.7713 17.0027 17.6667 15.8981 17.6667H3.89813Z"
        stroke={isActive ? '#FFFFFF' : '#A1A5AA'}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function VaultsIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.89812 16.6667H3.56479M3.56479 16.6667V13.3333M3.56479 16.6667L7.31479 12.9167M13.5648 3.33334H16.8981M16.8981 3.33334V6.66668M16.8981 3.33334L13.1481 7.08334M3.56479 6.66668L3.56479 3.33334M3.56479 3.33334L6.89812 3.33334M3.56479 3.33334L7.31479 7.08334M16.8981 13.3333L16.8981 16.6667M16.8981 16.6667H13.5648M16.8981 16.6667L13.1481 12.9167"
        stroke={isActive ? '#FFFFFF' : '#686D73'}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function OnePerpIcon({ stroke = 'white' }: { stroke?: string }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={18} height={18} rx={4} fill="currentColor" />
      <g clipPath="url(#clip0_1_363)">
        <rect x={3} y={3} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="5.5" y={3} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={8} y={3} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="10.5" y={3} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={13} y={3} width={2} height={2} rx={1} fill={stroke} />
      </g>
      <g clipPath="url(#clip1_1_363)">
        <rect x={3} y="5.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect x="5.5" y="5.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect x={8} y="5.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect x="10.5" y="5.5" width={2} height={2} rx={1} fill={stroke} />
        <rect x={13} y="5.5" width={2} height={2} rx={1} fill="currentColor" />
      </g>
      <g clipPath="url(#clip2_1_363)">
        <rect x={3} y={8} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="5.5" y={8} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={8} y={8} width={2} height={2} rx={1} fill={stroke} />
        <rect x="10.5" y={8} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={13} y={8} width={2} height={2} rx={1} fill="currentColor" />
      </g>
      <g clipPath="url(#clip3_1_363)">
        <rect x={3} y="10.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect x="5.5" y="10.5" width={2} height={2} rx={1} fill={stroke} />
        <rect x={8} y="10.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect
          x="10.5"
          y="10.5"
          width={2}
          height={2}
          rx={1}
          fill="currentColor"
        />
        <rect x={13} y="10.5" width={2} height={2} rx={1} fill="currentColor" />
      </g>
      <g clipPath="url(#clip4_1_363)">
        <rect x={3} y={13} width={2} height={2} rx={1} fill={stroke} />
        <rect x="5.5" y={13} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={8} y={13} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="10.5" y={13} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={13} y={13} width={2} height={2} rx={1} fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_1_363">
          <rect width={12} height={2} fill="white" transform="translate(3 3)" />
        </clipPath>
        <clipPath id="clip1_1_363">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3 5.5)"
          />
        </clipPath>
        <clipPath id="clip2_1_363">
          <rect width={12} height={2} fill="white" transform="translate(3 8)" />
        </clipPath>
        <clipPath id="clip3_1_363">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3 10.5)"
          />
        </clipPath>
        <clipPath id="clip4_1_363">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3 13)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export function ZeroDotFivePerpIcon({ stroke = 'white' }: { stroke?: string }) {
  return (
    <svg
      width={19}
      height={18}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={18} height={18} rx={4} fill="currentColor" />
      <g clipPath="url(#clip0_1_806)">
        <rect x="3.5" y={3} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={6} y={3} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="8.5" y={3} width={2} height={2} rx={1} fill={stroke} />
        <rect x={11} y={3} width={2} height={2} rx={1} fill={stroke} />
        <rect x="13.5" y={3} width={2} height={2} rx={1} fill={stroke} />
      </g>
      <g clipPath="url(#clip1_1_806)">
        <rect x="3.5" y="5.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect x={6} y="5.5" width={2} height={2} rx={1} fill={stroke} />
        <rect x="8.5" y="5.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect x={11} y="5.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect
          x="13.5"
          y="5.5"
          width={2}
          height={2}
          rx={1}
          fill="currentColor"
        />
      </g>
      <g clipPath="url(#clip2_1_806)">
        <rect x="3.5" y={8} width={2} height={2} rx={1} fill={stroke} />
        <rect x={6} y={8} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="8.5" y={8} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={11} y={8} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="13.5" y={8} width={2} height={2} rx={1} fill="currentColor" />
      </g>
      <g clipPath="url(#clip3_1_806)">
        <rect x="3.5" y="10.5" width={2} height={2} rx={1} fill={stroke} />
        <rect x={6} y="10.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect
          x="8.5"
          y="10.5"
          width={2}
          height={2}
          rx={1}
          fill="currentColor"
        />
        <rect x={11} y="10.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect
          x="13.5"
          y="10.5"
          width={2}
          height={2}
          rx={1}
          fill="currentColor"
        />
      </g>
      <g clipPath="url(#clip4_1_806)">
        <rect x="3.5" y={13} width={2} height={2} rx={1} fill={stroke} />
        <rect x={6} y={13} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="8.5" y={13} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={11} y={13} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="13.5" y={13} width={2} height={2} rx={1} fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_1_806">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3.5 3)"
          />
        </clipPath>
        <clipPath id="clip1_1_806">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3.5 5.5)"
          />
        </clipPath>
        <clipPath id="clip2_1_806">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3.5 8)"
          />
        </clipPath>
        <clipPath id="clip3_1_806">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3.5 10.5)"
          />
        </clipPath>
        <clipPath id="clip4_1_806">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3.5 13)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export function TwoPerpIcon({ stroke = 'white' }: { stroke?: string }) {
  return (
    <svg
      width={19}
      height={18}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={18} height={18} rx={4} fill="currentColor" />
      <g clipPath="url(#clip0_1_874)">
        <rect x="3.5" y={3} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={6} y={3} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="8.5" y={3} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={11} y={3} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="13.5" y={3} width={2} height={2} rx={1} fill={stroke} />
      </g>
      <g clipPath="url(#clip1_1_874)">
        <rect x="3.5" y="5.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect x={6} y="5.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect x="8.5" y="5.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect x={11} y="5.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect x="13.5" y="5.5" width={2} height={2} rx={1} fill={stroke} />
      </g>
      <g clipPath="url(#clip2_1_874)">
        <rect x="3.5" y={8} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={6} y={8} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="8.5" y={8} width={2} height={2} rx={1} fill="currentColor" />
        <rect x={11} y={8} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="13.5" y={8} width={2} height={2} rx={1} fill={stroke} />
      </g>
      <g clipPath="url(#clip3_1_874)">
        <rect
          x="3.5"
          y="10.5"
          width={2}
          height={2}
          rx={1}
          fill="currentColor"
        />
        <rect x={6} y="10.5" width={2} height={2} rx={1} fill="currentColor" />
        <rect
          x="8.5"
          y="10.5"
          width={2}
          height={2}
          rx={1}
          fill="currentColor"
        />
        <rect x={11} y="10.5" width={2} height={2} rx={1} fill={stroke} />
        <rect
          x="13.5"
          y="10.5"
          width={2}
          height={2}
          rx={1}
          fill="currentColor"
        />
      </g>
      <g clipPath="url(#clip4_1_874)">
        <rect x="3.5" y={13} width={2} height={2} rx={1} fill={stroke} />
        <rect x={6} y={13} width={2} height={2} rx={1} fill={stroke} />
        <rect x="8.5" y={13} width={2} height={2} rx={1} fill={stroke} />
        <rect x={11} y={13} width={2} height={2} rx={1} fill="currentColor" />
        <rect x="13.5" y={13} width={2} height={2} rx={1} fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_1_874">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3.5 3)"
          />
        </clipPath>
        <clipPath id="clip1_1_874">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3.5 5.5)"
          />
        </clipPath>
        <clipPath id="clip2_1_874">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3.5 8)"
          />
        </clipPath>
        <clipPath id="clip3_1_874">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3.5 10.5)"
          />
        </clipPath>
        <clipPath id="clip4_1_874">
          <rect
            width={12}
            height={2}
            fill="white"
            transform="translate(3.5 13)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export function TrendUpIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 5C12.0398 5 11.6667 5.3731 11.6667 5.83333C11.6667 6.29357 12.0398 6.66667 12.5 6.66667H16.3215L11.1869 11.8013C11.0122 11.976 10.9161 12.0711 10.8418 12.1342L10.8333 12.1413L10.8249 12.1342C10.7506 12.0711 10.6545 11.976 10.4798 11.8013L8.17995 9.50142C8.03126 9.35269 7.88642 9.20783 7.75375 9.0952C7.60805 8.9715 7.42313 8.83853 7.1817 8.76008C6.84697 8.65132 6.48639 8.65132 6.15165 8.76008C5.91022 8.83853 5.72531 8.9715 5.5796 9.0952C5.44693 9.20783 5.30211 9.35268 5.15341 9.50141L1.07742 13.5774C0.751984 13.9028 0.751984 14.4305 1.07742 14.7559C1.40286 15.0814 1.9305 15.0814 2.25593 14.7559L6.31312 10.6987C6.48785 10.524 6.58392 10.4289 6.65823 10.3658L6.66668 10.3587L6.67512 10.3658C6.74943 10.4288 6.8455 10.524 7.02023 10.6987L9.32008 12.9986C9.46878 13.1473 9.61359 13.2922 9.74627 13.4048C9.89197 13.5285 10.0769 13.6615 10.3183 13.7399C10.6531 13.8487 11.0136 13.8487 11.3484 13.7399C11.5898 13.6615 11.7747 13.5285 11.9204 13.4048C12.0531 13.2922 12.1979 13.1473 12.3466 12.9986L17.5 7.84518V11.6667C17.5 12.1269 17.8731 12.5 18.3333 12.5C18.7936 12.5 19.1667 12.1269 19.1667 11.6667V5.83333C19.1667 5.3731 18.7936 5 18.3333 5H12.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function TrendDownIcon() {
  return (
    <svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.7559 5.24408C2.43047 4.91864 1.90283 4.91864 1.57739 5.24408C1.25195 5.56951 1.25195 6.09715 1.57739 6.42259L5.65337 10.4986C5.80207 10.6473 5.94689 10.7922 6.07957 10.9048C6.22528 11.0285 6.41019 11.1615 6.65162 11.2399C6.98636 11.3487 7.34694 11.3487 7.68167 11.2399C7.9231 11.1615 8.10801 11.0285 8.25372 10.9048C8.3864 10.7922 8.53121 10.6473 8.67991 10.4986L10.9798 8.19873C11.1545 8.024 11.2506 7.92885 11.3249 7.86576L11.3333 7.85867L11.3418 7.86576C11.4161 7.92885 11.5121 8.024 11.6869 8.19873L16.8215 13.3333H13C12.5397 13.3333 12.1666 13.7064 12.1666 14.1667C12.1666 14.6269 12.5397 15 13 15H18.8333C19.2935 15 19.6666 14.6269 19.6666 14.1667V8.33333C19.6666 7.8731 19.2935 7.5 18.8333 7.5C18.3731 7.5 18 7.8731 18 8.33333V12.1548L12.8466 7.00142C12.6979 6.85269 12.5531 6.70783 12.4204 6.5952C12.2747 6.4715 12.0898 6.33853 11.8483 6.26008C11.5136 6.15132 11.153 6.15132 10.8183 6.26008C10.5769 6.33853 10.3919 6.4715 10.2462 6.5952C10.1136 6.70783 9.96877 6.85266 9.82008 7.00139L7.5202 9.30127C7.34547 9.476 7.2494 9.57115 7.17509 9.63424L7.16665 9.64133L7.1582 9.63424C7.08389 9.57115 6.98782 9.476 6.81309 9.30127L2.7559 5.24408Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function CurrencyIcon({ currency }: { currency: string }) {
  const iconMap: Record<string, JSX.Element> = {
    ETH: (
      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center z-10">
        <svg
          viewBox="0 0 784.37 1277.39"
          className="w-4 h-4 text-white"
          fill="currentColor"
          aria-label="Ethereum logo"
        >
          <path d="M392.07 0l-8.57 29.11v844.63l8.57 8.55 392.06-231.75z" />
          <path d="M392.07 0L0 650.54l392.07 231.75V472.33z" />
          <path d="M392.07 956.52l-4.83 5.89v300.87l4.83 14.1 392.3-552.49z" />
          <path d="M392.07 1277.38V956.52L0 724.89z" />
        </svg>
      </div>
    ),
    USDT: (
      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
        <svg
          viewBox="0 0 2000 2000"
          className="w-4 h-4 text-white"
          fill="currentColor"
          aria-label="USDC logo"
        >
          <path d="M1000 0c552.26 0 1000 447.74 1000 1000s-447.74 1000-1000 1000S0 1552.26 0 1000 447.74 0 1000 0" />
          <path
            d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.67c16.67 0 29.17-12.5 29.17-29.17v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.34-33.33h-62.5c-16.67 0-29.17 12.5-33.33 33.33v95.83c-125 16.67-204.17 100-204.17 204.17 0 137.5 83.33 191.67 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.33 112.5-137.5 112.5c-108.33 0-145.83-45.83-158.33-108.33-4.17-16.67-16.67-25-29.17-25h-70.83c-16.67 0-29.17 12.5-29.17 29.17v4.17c16.67 104.17 83.33 179.17 220.83 200v100c0 16.67 12.5 29.17 33.33 33.33h62.5c16.67 0 29.17-12.5 33.33-33.33v-100c125-20.83 208.33-108.33 208.33-220.83"
            fill="#ffffff"
          />
        </svg>
      </div>
    ),
    USDC: (
      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
        <svg
          viewBox="0 0 2000 2000"
          className="w-4 h-4 text-white"
          fill="currentColor"
          aria-label="USDC logo"
        >
          <path d="M1000 0c552.26 0 1000 447.74 1000 1000s-447.74 1000-1000 1000S0 1552.26 0 1000 447.74 0 1000 0" />
          <path
            d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.67c16.67 0 29.17-12.5 29.17-29.17v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.34-33.33h-62.5c-16.67 0-29.17 12.5-33.33 33.33v95.83c-125 16.67-204.17 100-204.17 204.17 0 137.5 83.33 191.67 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.33 112.5-137.5 112.5c-108.33 0-145.83-45.83-158.33-108.33-4.17-16.67-16.67-25-29.17-25h-70.83c-16.67 0-29.17 12.5-29.17 29.17v4.17c16.67 104.17 83.33 179.17 220.83 200v100c0 16.67 12.5 29.17 33.33 33.33h62.5c16.67 0 29.17-12.5 33.33-33.33v-100c125-20.83 208.33-108.33 208.33-220.83"
            fill="#ffffff"
          />
        </svg>
      </div>
    ),
    BTC: (
      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center z-10">
        <svg
          viewBox="0 0 32 32"
          className="w-4 h-4 text-white"
          fill="currentColor"
          aria-label="Bitcoin logo"
        >
          <path d="M15.76 19.475c.33-.153.62-.334.875-.547a3.15 3.15 0 0 0 .945-1.356c.176-.46.228-.953.176-1.434-.052-.481-.228-.927-.481-1.33-.254-.404-.584-.736-.978-.99s-.839-.432-1.318-.508c.381-.1.736-.279 1.051-.533.315-.254.584-.559.787-.914.203-.355.33-.736.355-1.14.026-.406-.052-.812-.203-1.191-.152-.38-.406-.71-.736-.99-.33-.279-.736-.483-1.191-.61-.457-.127-.965-.178-1.523-.178v-2.667h-1.472v2.642h-1.219v-2.642h-1.473v2.642h-2.972v1.574h1.015c.279 0 .508.025.66.102.153.076.254.178.33.33.076.152.102.355.102.635v7.49c0 .28-.026.483-.102.635-.076.152-.178.254-.33.33-.152.076-.381.102-.66.102h-1.015v1.574h2.972v2.642h1.473v-2.642h1.219v2.642h1.472v-2.667c.609-.025 1.168-.127 1.676-.28.508-.152.939-.38 1.32-.66zm-1.752-7.084c.457.101.812.304 1.066.584.254.279.38.66.355 1.117-.025.432-.177.787-.482 1.066-.305.28-.736.432-1.32.483v-3.25zm.685 6.246c.508-.101.914-.33 1.193-.66.279-.33.406-.736.381-1.244-.025-.482-.203-.863-.533-1.168-.33-.305-.812-.482-1.422-.533v3.682c.127-.025.254-.051.381-.077z" />
        </svg>
      </div>
    ),
    SOL: (
      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center z-10">
        <svg
          viewBox="0 0 397.7 311.7"
          className="w-4 h-4 text-white"
          fill="currentColor"
          aria-label="Solana logo"
        >
          <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" />
          <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" />
          <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" />
        </svg>
      </div>
    ),
    AVAX: (
      <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center z-10">
        <svg
          viewBox="0 0 1503 1504"
          className="w-4 h-4 text-white"
          fill="currentColor"
          aria-label="Avalanche logo"
        >
          <path d="M287 258c-77 77-141 142-141 144 0 1 165 2 367 2h366l141-141 141-141-366-2c-202-1-367 0-368 1-1 2-63 67-140 137zm794 652v422h-169 -169v-253c0-140-3-259-6-265-6-10-45-13-157-13h-150l-154 154c-160 159-172 176-130 176 13 0 24 4 24 9 0 6-61 10-157 10h-158l159-159 159-159h150c88 0 158-4 167-10 13-8 16-54 19-265l3-256h169 169v422z" />
        </svg>
      </div>
    ),
  }

  if (currency in iconMap) {
    return iconMap[currency]
  }

  // Generic icon for currencies not in the iconMap
  return (
    <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center z-10">
      <span className="text-xs font-bold text-white">
        {currency.charAt(0).toUpperCase()}
      </span>
    </div>
  )
}
