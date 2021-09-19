type MenuList = { id: string, name: string, description: string }[]
export function Menu({ menuList,onItemSelect }: { menuList: MenuList,onItemSelect: (itemId:string) => void }) {
    return <div><ul>
        {menuList.map((menuItem => <li onClick={()=>{
            onItemSelect(menuItem.id)
        }}>
            <h3>{menuItem.name}</h3>
            <p>{menuItem.description}</p>
        </li>))}
    </ul></div>
}