export const topEnterMotion = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export const botEnterMotion = {
  initial: { opacity: 0, y: +50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export const slideLeftMotion = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.3, delay: 0.15 },
}

export const slideRightMotion = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.3, delay: 0.15 },
}

export const hoverScaleMotion = {
  hover: { scale: 1.2 },
  transition: { duration: 0.2 },
}

export const expandMotion = {
  initial: { opacity: 0, scale: 0.90 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.90 },
  transition: { duration: 0.5 }
}
