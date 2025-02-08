import { Button } from '@/components';
import React from 'react';

const TokenForm = () => {
  return (
    <div className="mt-6 flex items-center justify-end gap-2">
      <button className="hover:bg-grey-600 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-gray-700 hover:cursor-pointer">
        ?
      </button>
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="토큰"
          className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-700 placeholder-gray-400"
        />
        <Button sort="primary" type="submit">
          <span>전체 캐릭터 동기화</span>
        </Button>
      </form>
    </div>
  );
};

export default TokenForm;
