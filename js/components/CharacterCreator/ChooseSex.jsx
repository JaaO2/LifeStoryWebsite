import React from 'react'
import SetAppearance from './SetAppearance';

function ChooseSex(props) {
  console.log(props)
  return (
    <div className="characterCreator_chooseSex">
      <div className="characterCreator_ChooseSex_Header">
        <i class="fa-solid fa-circle-question"></i> Wybierz płeć
      </div>
      <div className="characterCreator_ChooseSex_Content">
        <button className="characterCreator_ChooseSex_button" onClick={e => props.setSex("men")}>
          <i class="fa-solid fa-mars"></i> Mężczyzna
        </button>
        <button className="characterCreator_ChooseSex_button" onClick={e => props.setSex("women")}>
          <i class="fa-solid fa-venus"></i> Kobieta
        </button>
      </div>
    </div>
  )
}
export default ChooseSex