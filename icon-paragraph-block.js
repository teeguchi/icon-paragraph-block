( function( blocks, blockEditor, element, components ) {
    var el = element.createElement,
		RichText = blockEditor.RichText,
		AlignmentToolbar = blockEditor.AlignmentToolbar,
		BlockControls = blockEditor.BlockControls,
		Fragment = element.Fragment,
		InspectorControls = blockEditor.InspectorControls,
		PanelBody = components.PanelBody,
		SelectControl = components.SelectControl,
		ToggleControl = components.ToggleControl,
		FontSizePicker = components.FontSizePicker,
		BaseControl = components.BaseControl,
		ColorPalette = components.ColorPalette,
		ColorIndicator = components.ColorIndicator;
		
    blocks.registerBlockType( 'icon-paragraph/block', {
        title: 'アイコン段落',
        icon: {
			src: el( 'svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512' }, el( 'path', { fill: '#84d6c3', d: ipb.blockConfSVG.ghost } ) ),
		},
        category: 'layout',
        description: 'アイコン付きの段落ブロックを作成します。',
        attributes: {
            content: {
                type: 'array',
                source: 'children',
                selector: 'p',
            },
            alignment: {
                type: 'string',
                default: 'none',
            },
			selectIcon: {
				type: 'string',
				default: ipb.iconOptions[0].value,
			},
			iconSize: {
				type: 'string',
				default: ipb.iconSizeOptions[0].value,
			},
			iconColor: {
				type: 'string',
			},
			customIconColor: {
				type: 'string',
			},
			iconColorIndicator: {
				type: 'boolean',
				default: false,
			},
			lineType: {
				type: 'string',
				default: ipb.lineTypeOptions[0].value,
			},
			lineWidth: {
				type: 'string',
				default: ipb.LineWidthOptions[0].value,
			},
			toggleSquare: {
				type: 'boolean',
				default: false,
			},
			fontSize: {
				type: 'string',
			},
			customFontSize: {
				type: 'number',
			},
			borderColor: {
				type: 'string',
			},
			customBorderColor: {
				type: 'string',
			},
			borderColorIndicator: {
				type: 'boolean',
				default: false,
			},
			backgroundColor: {
				type: 'string',
			},
			customBackgroundColor: {
				type: 'string',
			},
			backgroundColorIndicator: {
				type: 'boolean',
				default: false,
			},
			textColor: {
				type: 'string',
			},
			customTextColor: {
				type: 'string',
			},
			textColorIndicator: {
				type: 'boolean',
				default: false,
			},
        },
        example: {
            attributes: {
                content: 'This block creates a paragraph with an icon in the block editor.',
                alignment: 'left',
                customFontSize: 18,
            },
        },
		styles: [
			{ name: 'default', label: '左上(デフォルト)', isDefault: true },
			{ name: 'right', label: '右上' },
			{ name: 'right-bottom', label: '右下' },
			{ name: 'fuki-left', label: '吹き出し左' },
			{ name: 'fuki-right', label: '吹き出し右' },
			{ name: 'none', label: 'アイコンなし' }
		],
        edit: function( props ) {
			var content = props.attributes.content,
				alignment = props.attributes.alignment,
				selectIcon = props.attributes.selectIcon,
				iconSize = props.attributes.iconSize,
				iconColor = props.attributes.iconColor,
				customIconColor = props.attributes.customIconColor,
				iconColorIndicator = props.attributes.iconColorIndicator,
				lineType = props.attributes.lineType,
				lineWidth = props.attributes.lineWidth,
				toggleSquare = props.attributes.toggleSquare,
				fontSize = props.attributes.fontSize,
				customFontSize = props.attributes.customFontSize,
				borderColor = props.attributes.borderColor,
				customBorderColor = props.attributes.customBorderColor,
				borderColorIndicator = props.attributes.borderColorIndicator,
				backgroundColor = props.attributes.backgroundColor,
				customBackgroundColor = props.attributes.customBackgroundColor,
				backgroundColorIndicator = props.attributes.backgroundColorIndicator,
				textColor = props.attributes.textColor,
				customTextColor = props.attributes.customTextColor,
				textColorIndicator = props.attributes.textColorIndicator;
            
            /* Check Style status */
			var styleStatus = {};
			styleStatus.iconNone = props.className.indexOf( 'is-style-none' ) !== -1 ? true : false;
			styleStatus.iconImg = selectIcon.indexOf( 'img-' ) !== -1 ? true : false;
			styleStatus.iconStyle = styleStatus.iconNone || styleStatus.iconImg ? true : false;
			styleStatus.borderNone = lineType.indexOf( 'none' ) !== -1 ? true : false;
            
            /* ClassName settings */
            var iconSizeClass = ' ipb-' + iconSize, // edit は、空白をいれる
				iconClass = ' ' + selectIcon,
				iconColorClass = iconColor ? ' ipb-' + iconColor : '',
				lineTypeClass = ' line-type-' + lineType,
				lineWidthClass = ' line-width-' + lineWidth,
				squareClass = toggleSquare === false ? '' : ' ipb-square',
				fontSizeClass = fontSize ? ' ipb-' + fontSize + '-font-size' : '',
				borderClass = borderColor ? ' ipb-' + borderColor : '',
				backgroundClass = backgroundColor ? ' ipb-' + backgroundColor : '',
				textClass = textColor ? ' ipb-' + textColor : '';
			
            /* Function to update General settings */
            function onChangeContent( newContent ) {
                props.setAttributes( { content: newContent } );
            }
 
            function onChangeAlignment( newAlignment ) {
                props.setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
            }
            
            /* Function to update Icon settings */
			function onChangeSelectIcon( newValue ) {
				props.setAttributes( { selectIcon: newValue } );
			}
			
			function onChangeIconSize( newValue ) {
				props.setAttributes( { iconSize: newValue } );
			}
			
			function onChangesIconColor( newColor ) {
				props.setAttributes( { iconColor: undefined } ); // カラークラスの初期化
				props.setAttributes( { iconColorIndicator: newColor ? true : false } );
				ipb.iconColorOptions.forEach( function( option ) { 
					if ( newColor === option.color ) {
						props.setAttributes( { iconColor: option.slug } );
					}
				} );
				props.setAttributes( { customIconColor: newColor } );
			}
			
			/* Function to update Border-line settings */
			function onChangeLineType( newValue ) {
				props.setAttributes( { lineType: newValue } );
			}
			
			function onChangeLineWidth( newValue ) {
				props.setAttributes( { lineWidth: newValue } );
			}
			
			function onChangeToggleSquare( newValue ) {
				props.setAttributes( { toggleSquare: newValue } );
			}
			
			/* Function to update Fontsize setting */
			function onChangeFontSize( newSize ) {
				props.setAttributes( { fontSize: undefined } );　// フォントサイズクラスの初期化
				ipb.fontSizeOptions.forEach( function( option ) { 
					if ( newSize === option.size ) {
						props.setAttributes( { fontSize: option.slug } );
					}
				} );
				props.setAttributes( { customFontSize: newSize } );
			}
			
			/* BorderColor ColorPalette setting */
			function onChangeBorderColor( newColor ) {
				props.setAttributes( { borderColor: undefined } ); // カラークラスの初期化
				props.setAttributes( { borderColorIndicator: newColor ? true : false } );
				ipb.borderColorOptions.forEach( function( option ) { 
					if ( newColor === option.color ) {
						props.setAttributes( { borderColor: option.slug } );
					}
				} );
				props.setAttributes( { customBorderColor: newColor } );
			}
			
			/* BackgroundColor ColorPalette setting */
			function onChangeBackgroundColor( newColor ) {
				props.setAttributes( { backgroundColor: undefined } ); // カラークラスの初期化
				props.setAttributes( { backgroundColorIndicator: newColor ? true : false } );
				ipb.backgroundColorOptions.forEach( function( option ) { 
					if ( newColor === option.color ) {
						props.setAttributes( { backgroundColor: option.slug } );
					}
				} );
				props.setAttributes( { customBackgroundColor: newColor } );
			}
			
			/* TextColor ColorPalette setting */
			function onChangeTextColor( newColor ) {
				props.setAttributes( { textColor: undefined } ); // カラークラスの初期化
				props.setAttributes( { textColorIndicator: newColor ? true : false } );
				ipb.textColorOptions.forEach( function( option ) { 
					if ( newColor === option.color ) {
						props.setAttributes( { textColor: option.slug } );
					}
				} );
				props.setAttributes( { customTextColor: newColor } );
			}

            return [
				el(
					Fragment,
					{},
					el(
						InspectorControls,
						{},
						el(
							PanelBody,
							{
								title: 'アイコンの設定',
								opened: styleStatus.iconNone ? false : true,
							},
							el(
								SelectControl,
								{
									label: 'アイコンの選択',
									value: selectIcon,
									options: ipb.iconOptions,
									onChange: onChangeSelectIcon,
								}
							),
							el(
								SelectControl,
								{
									label: 'アイコンの大きさ',
									value: iconSize,
									options: ipb.iconSizeOptions,
									onChange: onChangeIconSize,
								}
							),
							styleStatus.iconImg ? undefined : el(
								BaseControl,
								{ 
									label: [
										'アイコンフォントの色',
										iconColorIndicator ? el( ColorIndicator, { colorValue: customIconColor } ) : null
									],
								},
								el(
									ColorPalette,
									{
										colors: ipb.iconColorOptions,
										value: customIconColor,
										onChange: onChangesIconColor,
									}
								)
							)
						),
						el(
							PanelBody,
							{
								title: '段落の設定',
								initialOpen: false,
							},
							el(
								SelectControl,
								{
									label: '線の種類',
									value: lineType,
									options: ipb.lineTypeOptions,
									onChange: onChangeLineType,
								}
							),
							styleStatus.borderNone ? undefined : el(
								SelectControl,
								{
									label: '線の太さ',
									value: lineWidth,
									options: ipb.LineWidthOptions,
									onChange: onChangeLineWidth,
								}
							),
							el(
								ToggleControl,
								{
									label: '角丸の有無',
									help: toggleSquare ? '角丸をやめました。' : '角丸になっています。',
									checked: toggleSquare,
									onChange: onChangeToggleSquare,
								}
							),
							'文字サイズ',
							el(
								FontSizePicker,
								{
									fontSizes: ipb.fontSizeOptions,
									value: customFontSize,
									onChange: onChangeFontSize,
								}
							)
						),
						el(
							PanelBody,
							{
								title: [
									'色の設定',
									borderColorIndicator && ( ! styleStatus.borderNone ) ? el( ColorIndicator, { colorValue: customBorderColor } ) : null,
									backgroundColorIndicator ? el( ColorIndicator, { colorValue: customBackgroundColor } ) : null,
									textColorIndicator ? el( ColorIndicator, { colorValue: customTextColor } ) : null
								],
								className: 'ipb-color-settings-panel',
								initialOpen: false,
							},
							styleStatus.borderNone ? undefined : el(
								BaseControl, 
								{
									label: [
										'枠線色',
										borderColorIndicator ? el( ColorIndicator, { colorValue: customBorderColor } ) : null
									],
								},
								el(
									ColorPalette,
									{
										colors: ipb.borderColorOptions,
										value: customBorderColor,
										onChange: onChangeBorderColor,
									}
								)
							),
							el(
								BaseControl, 
								{
									label: [
										'背景色',
										backgroundColorIndicator ? el( ColorIndicator, { colorValue: customBackgroundColor } ) : null
									],
								},
								el(
									ColorPalette,
									{
										colors: ipb.backgroundColorOptions,
										value: customBackgroundColor,
										onChange: onChangeBackgroundColor,
									}
								)
							),
							el(
								BaseControl, 
								{
									label: [
										'文字色',
										textColorIndicator ? el( ColorIndicator, { colorValue: customTextColor } ) : null
									],
								},
								el(
									ColorPalette,
									{
										colors: ipb.textColorOptions,
										value: customTextColor,
										onChange: onChangeTextColor,
									}
								)
							)
						)
					)
				),
                el(
                    BlockControls,
                    { key: 'controls' },
                    el(
                        AlignmentToolbar,
                        {
                            value: alignment,
                            onChange: onChangeAlignment,
                        }
                    )
                ),
                el(
					'div',
					{
						className: props.className + ( styleStatus.iconNone ? '' : iconSizeClass ), // edit は、props.className が必要
					},
					el(
						'span', 
						{
							className: styleStatus.iconNone ? 'ipb-icon-none' : 'ipb-icon' + iconClass + iconColorClass,
							style: {
								color: iconColorClass || styleStatus.iconStyle ? undefined : customIconColor,
							},
						}
					),
					el(
						RichText,
						{
							key: 'richtext',
							tagName: 'p',
							style: {
								textAlign: alignment,
								fontSize: customFontSize ? customFontSize + 'px' : undefined, // edit は、px を付ける
								borderColor: borderClass || styleStatus.borderNone ? undefined : customBorderColor,
								backgroundColor: backgroundClass ? undefined : customBackgroundColor,
								color: textClass ? undefined : customTextColor,
							},
							className: 'ipb-paragraph' + lineTypeClass + ( styleStatus.borderNone ? '' : lineWidthClass + borderClass ) + backgroundClass + textClass + squareClass + fontSizeClass,
							onChange: onChangeContent,
							value: content,
						}
					)
				)
            ];
        },
        save: function( props ) {
			var content = props.attributes.content,
				alignment = props.attributes.alignment,
				selectIcon = props.attributes.selectIcon,
				iconSize = props.attributes.iconSize,
				iconColor = props.attributes.iconColor,
				customIconColor = props.attributes.customIconColor,
				lineType = props.attributes.lineType,
				lineWidth = props.attributes.lineWidth,
				toggleSquare = props.attributes.toggleSquare,
				fontSize = props.attributes.fontSize,
				customFontSize = props.attributes.customFontSize,
				borderColor = props.attributes.borderColor,
				customBorderColor = props.attributes.customBorderColor,
				backgroundColor = props.attributes.backgroundColor,
				customBackgroundColor = props.attributes.customBackgroundColor,
				textColor = props.attributes.textColor,
				customTextColor = props.attributes.customTextColor;
			
            /* Check Icon status */
			var styleStatus = {};
			styleStatus.iconNone = ( props.attributes.className || '' ).indexOf( 'is-style-none' ) !== -1 ? true : false;
			styleStatus.iconImg = selectIcon.indexOf( 'img-' ) !== -1 ? true : false;
			styleStatus.iconStyle = styleStatus.iconNone || styleStatus.iconImg ? true : false;
			styleStatus.borderNone = lineType.indexOf( 'none' ) !== -1 ? true : false;
			
			/* ClassName settings */
			var iconSizeClass = 'ipb-' + iconSize, // save は、空白をいれない
				iconClass = ' ' + selectIcon,
				iconColorClass = iconColor ? ' ipb-' + iconColor : '',
				lineTypeClass = ' line-type-' + lineType,
				lineWidthClass = ' line-width-' + lineWidth,
				squareClass = toggleSquare === false ? '' : ' ipb-square',
				fontSizeClass = fontSize ? ' ipb-' + fontSize + '-font-size' : '',
				borderClass = borderColor ? ' ipb-' + borderColor : '',
				backgroundClass = backgroundColor ? ' ipb-' + backgroundColor : '',
				textClass = textColor ? ' ipb-' + textColor : '';
            
            return el( 'div', {
				className: styleStatus.iconNone ? '' : iconSizeClass,
				},
				el( 'span', {
					className: styleStatus.iconNone ? 'ipb-icon-none' : 'ipb-icon' + iconClass + iconColorClass,
					style: {
						color: iconColorClass || styleStatus.iconStyle ? undefined : customIconColor,
					},
				} ),
				el( RichText.Content, {
					tagName: 'p',
					className: 'ipb-paragraph' + ' ipb-align-' + alignment + lineTypeClass + ( styleStatus.borderNone ? '' : lineWidthClass + borderClass ) + backgroundClass + textClass + squareClass + fontSizeClass,
					style: {
						fontSize: fontSizeClass ? undefined : customFontSize,
						borderColor: borderClass || styleStatus.borderNone ? undefined : customBorderColor,
						backgroundColor: backgroundClass ? undefined : customBackgroundColor,
						color: textClass ? undefined : customTextColor,
					},
					value: content,
				} )
			);
        },
    } );
}(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.element,
    window.wp.components
) );
