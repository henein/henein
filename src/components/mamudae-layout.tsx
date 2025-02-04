import { MamudaeFooter } from './mamudae-footer';
import { MamudaeHeader } from './mamudae-header';

export const MamudaeLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <div id="modal-root" />
      <div className="flex flex-col min-h-screen">
        <MamudaeHeader />
        <div className="flex flex-1">{children}</div>
        <MamudaeFooter />
      </div>
    </>
  );
};
