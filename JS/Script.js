const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const moiveSelect = document.getElementById('movie');

let ticketPrice = +moiveSelect.value;

populateUI();

// Save Selected Movie Indexs and prices
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);

}

// Updated the count and total
function updateSelectedCounts() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    // const seatsIndexs = [...selectedSeats].map(function(seat){
    //    return [...seats].indexOf(seat);
    // });
    const seatsIndexs = [...selectedSeats].map(seat =>
        [...seats].indexOf(seat)
    );

    //console.log(seatsIndexs);
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndexs));

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get Data from local storage

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
}

// Mocie-Case Event 
moiveSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCounts();
})

// Seats Event
container.addEventListener('click', e => {

    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {

        e.target.classList.toggle('selected');

        updateSelectedCounts();
    }
});








































