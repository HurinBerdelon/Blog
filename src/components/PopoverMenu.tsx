import { Popover } from "@headlessui/react";
import Link from "next/link";
import { List } from "phosphor-react";

export function PopoverMenu(): JSX.Element {

    return (
        <menu>
            <Popover>
                <Popover.Button className="text-3xl">
                    <List />
                    <span className="sr-only">Button to Open Menu</span>
                </Popover.Button>
                <Popover.Panel className="absolute right-2 rounded bg-greenBrand p-4 min-w-[80px]">
                    {/* <div>
                        <div>
                        <img src="#" alt="profile" />
                        </div>
                    </div> */}
                    <nav className="flex flex-col gap-1 text-white font-medium">
                        <Link href='/'>Home</Link>
                        <Link href='/list/react'>React</Link>
                        <Link href='/list/next'>Next</Link>
                    </nav>
                </Popover.Panel>
            </Popover>
        </menu>
    )
}