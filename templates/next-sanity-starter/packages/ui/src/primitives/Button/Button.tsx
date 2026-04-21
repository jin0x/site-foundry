import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { cx } from '../../lib/cx';
import {
  BUTTON_SIZE_CLASSES,
  BUTTON_VARIANT_COLOR_CLASSES,
  type ButtonColor,
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
  children?: ReactNode;
}

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 relative overflow-hidden rounded-full font-heading font-medium transition-all duration-200 cursor-pointer no-underline';

export function Button({
  variant = 'solid',
  size = 'md',
  color = 'primary',
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cx(
    BASE_CLASSES,
    BUTTON_SIZE_CLASSES[size],
    BUTTON_VARIANT_COLOR_CLASSES[variant][color],
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
