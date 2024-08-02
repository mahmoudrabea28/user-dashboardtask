import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
@Component({
  selector: 'app-user-list-page2',
  templateUrl: './user-list-page2.component.html',
  styleUrls: ['./user-list-page2.component.scss']
})
export class UserListPage2Component {
  progressValue = 0;
  message = '';
  searchQuery: string | null= '';
  users: any[] = [];
  isLoading = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    //this.fetchAllUsers();
    this.userService.getUsers(2).subscribe(data => {
      this.users = data.data;
      this.isLoading = false;
    });
    if(Number(localStorage.getItem("search")) > 6){
      this.searchQuery = localStorage.getItem("search")
    }else{
      this.searchQuery = '';
    }
  }
  
  // fetchAllUsers() {
  //   this.userService.getUsers(1).subscribe(firstPageData => {
  //     this.users = firstPageData.data;
  //     const totalPages = firstPageData.total_pages;
  //     const requests = [];

  //     for (let page = 2; page <= totalPages; page++) {
  //       requests.push(this.userService.getUsers(page));
  //     }

  //     Promise.all(requests.map(req => req.toPromise())).then(responses => {
  //       responses.forEach(response => {
  //         this.users = this.users.concat(response.data);
  //       });
  //       this.isLoading = false;
  //     }).catch(error => {
  //       console.error('Error fetching users:', error);
  //       this.isLoading = false;
  //     });
  //   });
  // }
  viewDetails(id: number) {
    this.progressValue = 0;
    this.message = '';

    this.isLoading = true;
    // Simulate a process with a progress bar
    interval(100)
      .pipe(takeWhile(() => this.progressValue < 100))
      .subscribe(() => {
        this.progressValue += 10; // Increment the progress
        if (this.progressValue >= 100) {
          this.completeAction(id);
        }
      });
    // Implement navigation to user details
    
  }

  completeAction(id: number) {
    this.router.navigate(['/user', id]);
    // this.message = 'Action Completed!';
    // Additional actions can be performed here
  }
  goBack(){
    this.searchQuery = '';
    this.progressValue = 0;
        this.message = '';

        this.isLoading = true;
        // Simulate a process with a progress bar
        interval(100)
          .pipe(takeWhile(() => this.progressValue < 100))
          .subscribe(() => {
            this.progressValue += 10; // Increment the progress
            if (this.progressValue >= 100) {
              this.completeAction1();
            }
          });
    
    localStorage.removeItem("search");
    
  }


  completeAction1(){
    this.router.navigate(['/']);
  }

  searchUser() {
    if (this.searchQuery) {
      // Implement navigation to the user's detail page
          const userId = Number(this.searchQuery);

          localStorage.setItem("search" , this.searchQuery);
      // Navigate to the user's detail page if the user ID is valid
      if (!isNaN(userId) && userId > 6 && userId < 13) {
        this.progressValue = 0;
        this.message = '';

        this.isLoading = true;
        // Simulate a process with a progress bar
        interval(100)
          .pipe(takeWhile(() => this.progressValue < 100))
          .subscribe(() => {
            this.progressValue += 10; // Increment the progress
            if (this.progressValue >= 100) {
              this.completeAction(userId);
            }
          });
        // this.router.navigate(['/user', userId]);
      } else {
        console.error('Invalid user ID.');
        // Optionally, handle invalid ID (show a message, clear input, etc.)
      }
    }
  }
}
