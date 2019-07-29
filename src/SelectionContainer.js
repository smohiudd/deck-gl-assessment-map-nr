import React from "react"

function SelectionContainer(props) {
  return (
    <div>
      <div className='absolute top left w360 h240 py12 px12 ml36 mt36 bg-white round-bold prose'>
      <h4>City of Calgary <span class='txt-underline'>Non-Residential Property Assessment</span></h4>
        <div class='w300 round shadow-darken10 px6 py6 txt-s mt12'>
          <strong class='block mb6'>Non-Residental Assessment Value</strong>
          <div class='flex-parent flex-parent--center-main flex-parent--center-cross align-center'>
            <div class='flex-child flex-child--grow wmin24'>
              <span class='inline-block w3 h3 round-full bg-blue'></span>
            </div>
            <div class='flex-child flex-child--grow wmin24'>
              <span class='inline-block w6 h6 round-full bg-blue'></span>
            </div>
            <div class='flex-child flex-child--grow wmin24'>
              <span class='inline-block w12 h12 round-full bg-blue'></span>
            </div>
            <div class='flex-child flex-child--grow wmin24'>
              <span class='inline-block w18 h18 round-full bg-blue'></span>
            </div>
            <div class='flex-child flex-child--grow wmin24'>
              <span class='inline-block w36 h36 round-full bg-blue'></span>
            </div>
            <div class='flex-child flex-child--grow wmin24'>
              <span class='inline-block w60 h60 round-full bg-blue'></span>
            </div>
          </div>
          <div class='grid txt-xs align-center'>
            <div class='col wmin24'>$1 Million</div>
            <div class='col wmin24'></div>
            <div class='col wmin24'></div>
            <div class='col wmin24'></div>
            <div class='col wmin24'></div>
            <div class='col wmin24'>$1 Billion</div>
          </div>
        </div>
        <div class="txt-s mt12"><a href="https://saadiqm.com/deck-gl-assessment-map-re/">Link</a> to Residental Property assessment map</div>
      </div>
    </div>
  )
}


export default SelectionContainer
