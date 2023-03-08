import { ReactNode } from 'react';
import Text from './Text';
import NavElement from './nav-element';

interface ContentContainerProps {
  children: ReactNode;
}

export const ContentContainer = ({ children }: ContentContainerProps) => (
  <div className='drawer h-52 flex-1'>
    <input id='my-drawer' type='checkbox' className='drawer-toggle grow' />
    <div className='drawer-content  items-center'>{children}</div>
    {/* SideBar / Drawer */}
    <div className='drawer-side'>
      <label htmlFor='my-drawer' className='drawer-overlay gap-6' />

      <ul className='menu w-80 items-center gap-10 overflow-y-auto bg-base-100 p-4 sm:flex'>
        <li>
          <Text
            variant='heading'
            className='mt-10 bg-gradient-to-br from-indigo-500 to-fuchsia-500 bg-clip-text text-center font-extrabold tracking-tighter text-transparent'
          >
            Menu
          </Text>
        </li>
        <li>
          <NavElement label='Home' href='/' />
        </li>
        <li>
          <NavElement label='Basics' href='/basics' />
        </li>
      </ul>
    </div>
  </div>
);
