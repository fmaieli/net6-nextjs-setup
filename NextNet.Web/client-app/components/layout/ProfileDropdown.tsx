import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useContext } from "react";
import { UserContext } from '../../context/user/useUser'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const ProfileDropdown = () => {
  
  const user = useContext(UserContext);

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          <div
            className="font-bold text-gray-700 rounded-full bg-white flex items-center justify-center font-mono"
            style={{
              height: '30px',
              width: '30px',
              fontSize: '17px',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 18C1.5 18 0 18 0 16.5C0 15 1.5 10.5 9 10.5C16.5 10.5 18 15 18 16.5C18 18 16.5 18 16.5 18H1.5ZM9 9C10.1935 9 11.3381 8.52589 12.182 7.68198C13.0259 6.83807 13.5 5.69347 13.5 4.5C13.5 3.30653 13.0259 2.16193 12.182 1.31802C11.3381 0.474106 10.1935 0 9 0C7.80653 0 6.66193 0.474106 5.81802 1.31802C4.97411 2.16193 4.5 3.30653 4.5 4.5C4.5 5.69347 4.97411 6.83807 5.81802 7.68198C6.66193 8.52589 7.80653 9 9 9V9Z"
                fill="#4D60A8"
              />
            </svg>{' '}
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y z-[1]">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm'
                )}
              >
                <div className={classNames('text-gray-700 font-medium break-words')}>
                  {user.name}
                </div>
                <div className={classNames('text-gray-400 break-words')}>
                  {user.email}
                </div>
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm'
                )}
              >
                <div className={classNames('text-gray-700 font-medium')}>
                  Roles
                </div>
                {
                  user.roles.map(rol => (
                    <div key={rol} className={classNames('text-gray-400')}>
                          {rol}
                    </div>
                  ))
                }
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
