//App.js

import React, { useState } from 'react';
import './App.css';
import SearchComponent from './components/Skill-lab-3A/SearchComponent';
import ShowCourseComponent from './components/Skill-lab-3A/ShowCourseComponent';
import UserCartComponent from './components/Skill-lab-3A/UserCartComponent';

function App() {
	const [courses, setCourses] = useState([
		{ id: 1, 
		name: 'supernova', 
		price: 499, 
		image: 
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBe8Xa19eJpN0_XQjUlpO3VDKfSaNgTPuRUHw9d7kQMRvwOOMQErwVFH37zYi_VS5Ron4&usqp=CAU'
		},
		{ id: 2, 
		name: 'google watch pro', 
		price: 699, 
		image: 
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzWokqFcui53gFbYLeMbPLiFxt0Wf5Gpq_fYLI03Fpd0Ns8GrGdPYhHQT-QTJEKoyQzs&usqp=CAU'
		},
		{ id: 3, 
		name: 'apple watch', 
		price: 799, 
		image: 
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_kRgCK87xZSxA8WLa0mmQKrMdTqFjDIP9Q&usqp=CAU'
		}
	]);

	const [cartCourses, setCartCourses] = useState([]);
	const [searchCourse, setSearchCourse] = useState('');

	const addCourseToCartFunction = (GFGcourse) => {
		const alreadyCourses = cartCourses
							.find(item => item.product.id === GFGcourse.id);
		if (alreadyCourses) {
			const latestCartUpdate = cartCourses.map(item =>
				item.product.id === GFGcourse.id ? { 
				...item, quantity: item.quantity + 1 } 
				: item
			);
			setCartCourses(latestCartUpdate);
		} else {
			setCartCourses([...cartCourses, {product: GFGcourse, quantity: 1}]);
		}
	};

	const deleteCourseFromCartFunction = (GFGCourse) => {
		const updatedCart = cartCourses
							.filter(item => item.product.id !== GFGCourse.id);
		setCartCourses(updatedCart);
	};

	const totalAmountCalculationFunction = () => {
		return cartCourses
			.reduce((total, item) => 
						total + item.product.price * item.quantity, 0);
	};

	const courseSearchUserFunction = (event) => {
		setSearchCourse(event.target.value);
	};

	const filterCourseFunction = courses.filter((course) =>
		course.name.toLowerCase().includes(searchCourse.toLowerCase())
	);

	return (
		<div className="App">
			<SearchComponent searchCourse={searchCourse} 
							courseSearchUserFunction=
								{courseSearchUserFunction} />
			<main className="App-main">
				<ShowCourseComponent
					courses={courses}
					filterCourseFunction={filterCourseFunction}
					addCourseToCartFunction={addCourseToCartFunction}
				/>

				<UserCartComponent
					cartCourses={cartCourses}
					deleteCourseFromCartFunction={deleteCourseFromCartFunction}
					totalAmountCalculationFunction={
						totalAmountCalculationFunction
					}
					setCartCourses={setCartCourses}
				/>
			</main>
		</div>
	);
}

export default App;
