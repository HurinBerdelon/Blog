import { Popover } from "@headlessui/react";
import Link from "next/link";
import { List } from "phosphor-react";

export function PopoverMenu(): JSX.Element {

    return (
        <menu>
            <Popover>
                <Popover.Button>
                    <List />
                    <span className="sr-only">Button to Open Menu</span>
                </Popover.Button>
                <Popover.Panel>
                    {/* <div>
                        <div>
                        <img src="#" alt="profile" />
                        </div>
                    </div> */}
                    <nav>
                        <Link href='/'>Home</Link>
                        <Link href='/list/react'>React</Link>
                        <Link href='/list/next'>Next</Link>
                    </nav>
                </Popover.Panel>
            </Popover>
        </menu>
    )
}