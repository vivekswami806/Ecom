import React, { useState } from 'react'

function Loding({data}) {
  return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white p-8 rounded shadow-lg z-50">
            <div className="flex items-center justify-center mb-4">
              <svg className="animate-spin h-8 w-8 mr-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.125a4.001 4.001 0 00-4 4.004h3.125zm3.643 3.643a8.065 8.065 0 01-1.768 1.768l1.768 1.768a9.976 9.976 0 002.16-2.16l-2.16-1.768zm10.648-10.648l-1.768 1.768a8.065 8.065 0 01-1.768-1.768l1.768-1.768a9.976 9.976 0 002.16 2.16z"></path>
              </svg>
              <span className="text-gray-700">{data} </span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Loding