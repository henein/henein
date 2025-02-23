import { MamudaeFooter } from './mamudae-footer';
import { MamudaeHeader } from './mamudae-header';
import Notice from './notice';

export const MamudaeLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <div id="modal-root" />
      <div className="flex min-h-screen flex-col">
        <MamudaeHeader />
        <div className="max-[66rem]:px-4">
          <Notice />
        </div>
        <div className="max-[66rem]:px-4 flex flex-1">{children}</div>
        <MamudaeFooter />
      </div>
    </>
  );
};
