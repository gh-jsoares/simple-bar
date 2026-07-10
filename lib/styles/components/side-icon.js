export const sideIconStyles = /* css */ `
.apple-menu {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 2px 0 5px;
  z-index: 100;
}
.apple-menu__trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: var(--item-radius);
  background: transparent;
  color: var(--foreground);
  cursor: pointer;
  transition: background-color 160ms var(--transition-easing);
}
.apple-menu__trigger:hover {
  background-color: var(--minor);
}
.apple-menu__icon {
  width: 14px;
  height: 14px;
  fill: currentColor;
}
.apple-menu__dropdown {
  position: fixed;
  top: var(--bar-height);
  left: 5px;
  min-width: 200px;
  padding: 4px 0;
  background-color: var(--minor);
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  animation: apple-menu-appear 120ms var(--transition-easing);
  z-index: 9999;
}
@keyframes apple-menu-appear {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
.apple-menu__item {
  display: block;
  width: calc(100% - 8px);
  margin: 0 4px;
  padding: 6px 12px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--foreground);
  font-family: var(--font);
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  transition: background-color 100ms var(--transition-easing);
}
.apple-menu__item:hover {
  background-color: var(--blue);
  color: var(--background);
}
.apple-menu__separator {
  height: 1px;
  margin: 4px 12px;
  background-color: rgba(255, 255, 255, 0.1);
}
`;
