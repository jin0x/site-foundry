import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { cx } from '../../lib/cx';
import {
  BUTTON_PILL_PX_BY_SIZE,
  BUTTON_SHAPE_CLASSES,
  BUTTON_SIZE_CLASSES,
  BUTTON_VARIANT_COLOR_CLASSES,
  DEFAULT_SHAPE_BY_VARIANT,
  type ButtonColor,
  type ButtonShape,
  type ButtonSize,
  type ButtonVariant,
} from './button-types';

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type NativeAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export interface ButtonProps
  extends Omit<NativeButtonProps & NativeAnchorProps, 'color'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  shape?: ButtonShape;
  children?: ReactNode;
}

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 relative overflow-hidden font-heading font-medium transition-all duration-200 cursor-pointer no-underline';

export function Button({
  variant = 'solid',
  size = 'md',
  color = 'primary',
  shape,
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const effectiveShape = shape ?? DEFAULT_SHAPE_BY_VARIANT[variant];
  /* Pill uses size-dependent horizontal padding; rectangular has its own
   * fixed px-5 in BUTTON_SHAPE_CLASSES. Conditional avoids size px-N
   * shadowing rectangular's px-5 in compiled CSS. */
  const horizontalPx = effectiveShape === 'pill' ? BUTTON_PILL_PX_BY_SIZE[size] : '';
  const classes = cx(
    BASE_CLASSES,
    BUTTON_SIZE_CLASSES[size],
    horizontalPx,
    BUTTON_VARIANT_COLOR_CLASSES[variant][color],
    BUTTON_SHAPE_CLASSES[effectiveShape],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as NativeAnchorProps)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as NativeButtonProps)}>
      {children}
    </button>
  );
}
