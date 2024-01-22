import { NavLink } from "react-router-dom"

const Nav = () => {
  return (
    <header className="header">
      <div className="container">
        <ul>
          <li><NavLink to='/news'>Новости</NavLink></li>
          <li><NavLink to='/map'>Карта</NavLink></li>
        </ul>
      </div>
    </header>
  )
}

export default Nav