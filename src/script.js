const form = document.getElementById('guestForm');
const input = document.getElementById('guestName');
const list = document.getElementById('guestList');

// Now guests will be objects: { name: '...', rsvp: true/false }
let guests = [];

function showGuests() {
  list.innerHTML = ''; // Clear the list first

  guests.forEach(function(guest, index) {                        
    const li = document.createElement('li');

    // Guest name text
    const nameSpan = document.createElement('span');
    nameSpan.textContent = guest.name + ' ';

    // RSVP status text
    const rsvpSpan = document.createElement('span');
    rsvpSpan.textContent = guest.rsvp ? '(Attending)' : '(Not Attending)';
    rsvpSpan.style.color = guest.rsvp ? 'green' : 'red';
    rsvpSpan.style.marginRight = '10px';

    // Toggle RSVP button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle RSVP';
    toggleBtn.style.marginRight = '10px';
    toggleBtn.addEventListener('click', function() {
      guests[index].rsvp = !guests[index].rsvp; // Switch RSVP status
      showGuests(); // Refresh the list
    });

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', function() {
      guests.splice(index, 1);
      showGuests();
    });

    // Add all elements to the list item
    li.appendChild(nameSpan);
    li.appendChild(rsvpSpan);
    li.appendChild(toggleBtn);
    li.appendChild(removeBtn);

    list.appendChild(li);
  });
}

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = input.value.trim();

  if(name === '') {
    alert('Please enter a guest name');
    return;
  }

  if(guests.length >= 10) {
    alert('Guest list is full. Max 10 guests allowed.');
    return;
  }

  // Add guest as object with default RSVP = false (Not Attending)
  guests.push({ name: name, rsvp: false });

  input.value = '';
  showGuests();
});

showGuests();
