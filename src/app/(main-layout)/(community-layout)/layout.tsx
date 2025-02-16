const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto mt-6 flex w-full max-w-5xl">
      {children}
    </div>
  );
};

export default CommunityLayout;
