/*

__________________________________________________
 \====\\========== SPRINT GOALS ==========//====/
  ==============================================

__________________________________________________
==================================================
Sprint 1: 10:30 - 12:00

DONE
firebase config
DONE
console log on auth state change
DONE
set state variable on auth state change

DONE
sign in page logs in user

DONE
sign in page redirects to courses page

DONE
set topbar on auth state change

DONE
logout button on account pagelogs out user

DONE
account page redirects to hom page on logout

Enroll:
DONE
enroll creates user

DONE
enroll page goes to courses page when user signs in

DONE
enroll page adds course to user data

finished at 11:17
__________________________________________________
==================================================
Sprint 2 2 - 3:30


DONE
connect to database

DONE
put course data in firebase (verify in console)

DONE
put user data in fireabse (verify in console)

DONE
get course data from firebase (and just log it)

DONE
get user data from firebase  (and just log it)

2:19

load courses from db for:

DONE
browseCourses

DONE
userCourses

3:30


__________________________________________________
==================================================
Sprint 3 4 - 5:30

user profile info saves to db when press save
user profile loads from db on page start
if no data just doesn't fill in inputs

enrollUser(courseId)
  enrolls a user in a course by adding given course to their data set
  enroll page puts selected course in user data then goes to the course page
  if user is signed in and browses enroll button calles enrollUser, then goes to the page
  now user courses should show in the userCourses page based on what was enrolled in

view coures page loads from db
  when user selecte view course the data for the course loads

user data saves into db as user goes through course
  when user presses next button the data goes into the db

user data loads from db when they start the course
  when the page loads info such as section step loads from the db


__________________________________________________
==================================================
Backlog



edit course page laods from db

make changes in db for all edit functions:

add 
chapter
section
element
content

update
chapter
section
element
content

delete
chapter
section
element
content

enroll page
update styling: error message font
display error message function
put sign in link in error message for user already created: Firebase: Error (auth/email-already-in-use).

search and browser courses buttons in topbar of userCourses page

create course button on userCourses page
only if they have admin attribute on their account

payment

structure data for efficiency
https://firebase.google.com/docs/database/web/structure-data

courseData
  contains all the course data such as sections, elements, etc
courseNames
  just items like the name, description, and image link
  used to show list of courses when browsing without downloading entire course data set

userMetaData
  shows a list of users with basic info that can be queried
userData
  all the user data such as step level in each section and element

when changing elements in edit course only upload what is needed
don't re-download, just update local state
on pressing save upload all to make sure it is syncronized

__________________________________________________
==================================================
UI Flows

====================
Flow 1 
(Enroll)

user selects browse courses
course data loads and is displayed

user selects view more / enroll button
they go to enroll page
put in user info and press enroll
user is created
course is put in their user in the db
view course is loaded with course data

user clicks next on the course page
section step changes in state
section step is saved in db

====================
Flow 2 
(Resume course)

user goes to home page (already logged in)
they select courses tab
courses they are enrolled in show on courses page
the press continue
viewCourse page displays
user selects next on elements as above

====================
Flow 3
(Enroll in second course)

user is already signed in
goes to courses
their courses load
selecte browser courses (top button)
all courses load
user selects enroll
they go to a more info page
they press enroll button
course is added to their courses
page redirects to viewCourse page
user begins going through course



__________________________________________________
==================================================
github
branch
auth
database

website flows

payment

https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fsnowcapped-trees-glistening-sunshine-winter-landscape-thick-snow-covering-forest-trail-stretching-ahead-70363761.jpg&f=1&nofb=
https://www.youtube.com/embed/jBI5APjHteY

// Here modifying the course data and uploading the whole thing
                set(ref(database, "cape-school/courses/"+courseId), newCourseData)

                //setCoursesData(newCourseData)

                // Would be a lot better to add at the specific point

                // and only have to onValue specific part that changes

                // Or maybe not even have to onvalue, can change in db by uploading what is needed and change local state

                // When pressing save local state could be uploaded to make sure

                // This way realtime changes could be done efficiently

*/