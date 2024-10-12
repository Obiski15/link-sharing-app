interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  currentTab: string;
  activeTab: string;
  children: string;
  Icon?: any;
}

function Tab({ children, onClick, Icon, activeTab, currentTab }: Props) {
  return (
    <button
      className={`${
        activeTab === currentTab
          ? "bg-primaryButton/40 text-primary-foreground"
          : "text-secondary-foreground bg-primary"
      } rounded-lg flex justify-between items-center gap-1 py-[11px] px-[27px] font-semibold text-md leading-2 active:bg-primary`}
      onClick={onClick}
    >
      <Icon />
      <span className="hidden sm:block">{children}</span>
    </button>
  );
}

export default Tab;
