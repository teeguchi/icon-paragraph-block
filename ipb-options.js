var ipb = ipb || {};

/* Icon options */
ipb.iconOptions = [
	{ label: 'ゴースト', value: 'img-ghost' }, 
	{ label: 'ねこちゃん', value: 'img-neko' }, 
	{ label: 'うさちゃん', value: 'img-usagi' },
	{ label: 'インフォメーション', value: 'img-info' },
	{ label: '注意', value: 'img-chui' },
	{ label: '外部リンク', value: 'fas fa-external-link-alt' },
	{ label: 'GitHub', value: 'fab fa-github' },
	{ label: 'リンク', value: 'fas fa-link' },
	{ label: 'ペン', value: 'fas fa-pen' },
	{ label: 'うんち', value: 'fas fa-poo' }
];

/* Icon font Color options */
ipb.iconColorOptions = [
	{ name: '注意マークの黄色', color: '#fbdd64', slug: 'warning-yellow' },
	{ name: '軽めの赤紫系の色', color: '#f690b9', slug: 'light-magenta' },
	{ name: '薄い青緑系の色', color: '#abc9c3', slug: 'light-blue-green' },
	{ name: '淡いスレートグレー', color: '#778899', slug: 'light-slate-gray' }
];

/* BorderColor options */
ipb.borderColorOptions = [
	{ name: 'ねこの黃色', color: '#fbdd64', slug: 'cat-yellow-border' },
	{ name: 'うさぎのピンク', color: '#fed8dd', slug: 'rabbit-pink-border' },
	{ name: '薄い青緑系の色', color: '#bbd6d0', slug: 'light-blue-green-border' },
	{ name: '淡いスレートグレー', color: '#7b8b9a', slug: 'light-slate-gray-border' }
];

/* BackgroundColor options */
ipb.backgroundColorOptions = [
	{ name: '超薄い黄系の色', color: '#fffaf0', slug: 'floral-white-bg-color' },
	{ name: '超薄い赤系の色', color: '#fef7f7', slug: 'super-light-red-bg-color' },
	{ name: '超薄い青系の色', color: '#eff6fa', slug: 'super-light-blue-bg-color' },
	{ name: '超薄い青紫系の色', color: '#f8f8ff', slug: 'ghost-white-bg-color' }
];

/* TextColor options */
ipb.textColorOptions = [
	{ name: '琥珀', color: '#fcb900', slug: 'luminous-vivid-amber-color' },
	{ name: 'ピンク', color: '#f78da7', slug: 'pale-pink-color' },
	{ name: 'ドジャーブルー', color: '#1e90ff', slug: 'dodger-blue-color' },
	{ name: 'とても暗いグレー', color: '#4e4e4e', slug: 'very-dark-gray-color' }
];

/* LineType options */
ipb.lineTypeOptions = [
	{ label: '実線', value: 'solid' },
	{ label: '点線', value: 'dotted' },
	{ label: '破線', value: 'dashed' },
	{ label: '二重線', value: 'double' },
	{ label: '実線左のみ', value: 'solid-left' },
	{ label: 'なし', value: 'none' }
],

/* LineWidth options */
ipb.LineWidthOptions = [
	{ label: '標準', value: 'normal' },
	{ label: '細い', value: 'thin' },
	{ label: 'やや太い', value: 'medium' },
	{ label: '太い', value: 'thick' }
],

/* FontSize options */
ipb.fontSizeOptions = [
	{ name: '小', slug: 'small', size: 13 },
	{ name: '標準', slug: 'normal', size: 16 },
	{ name: '中', slug: 'medium', size: 20 },
	{ name: '大', slug: 'big', size: 36 }
];

/* IconSize options */
ipb.iconSizeOptions = [
	{ label: '標準', value: 'normal' },
	{ label: '極小', value: 'tiny' },
	{ label: '小', value: 'small' },
	{ label: '大', value: 'large' }
];

/* Block Configuration Icon SVG path */
ipb.blockConfSVG = {
	ghost: 'M508.374,432.802c0,0-46.6-39.038-79.495-275.781C420.046,69.341,346.023,0.882,256,0.882c-90.015,0-164.046,68.458-172.879,156.138C50.226,393.763,3.626,432.802,3.626,432.802c-15.107,25.181,20.733,28.178,38.699,27.94c35.254-0.478,35.254,40.294,70.516,40.294c35.254,0,35.254-35.261,70.508-35.261s37.396,45.343,72.65,45.343s37.389-45.343,72.651-45.343c35.254,0,35.254,35.261,70.508,35.261s35.27-40.772,70.524-40.294C487.641,460.98,523.48,457.982,508.374,432.802z M208.769,225.031c-12.518,0-22.676-10.15-22.676-22.675c0-12.518,10.158-22.66,22.676-22.66c12.516,0,22.66,10.142,22.66,22.66C231.429,214.881,221.285,225.031,208.769,225.031zM297.983,225.031c-12.525,0-22.668-10.15-22.668-22.675c0-12.518,10.143-22.66,22.668-22.66c12.509,0,22.667,10.142,22.667,22.66C320.65,214.881,310.492,225.031,297.983,225.031z',
};
