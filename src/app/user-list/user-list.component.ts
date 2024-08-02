import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  progressValue = 0;
  searchQuery: string | null= '';
  users: any[] = [];
  isLoading = true;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    //this.fetchAllUsers();
    this.userService.getUsers(1).subscribe(data => {
      this.users = data.data;
      this.isLoading = false;
    });
    if(Number(localStorage.getItem("search")) < 7){
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
    
  }

  completeAction(id: number) {
    this.router.navigate(['/user', id]);
     // Implement navigation to user details
    // this.router.navigate(['/user', userId]);
  }
  goBack(){
        this.searchQuery = '';
        this.progressValue = 0;

        this.isLoading = true;
        // Simulate a process with a progress bar
        interval(100)
          .pipe(takeWhile(() => this.progressValue < 100 ))
          .subscribe(() => {
            this.progressValue += 10; // Increment the progress
            if (this.progressValue >= 100) {
              this.completeAction1();
            }
          });
    
          localStorage.removeItem("search");
  }


  completeAction1(){
    this.router.navigate(['/page2']);
  }
  searchUser() {
    if (this.searchQuery) {
      localStorage.setItem("search", this.searchQuery);
      // Create a timer that emits after 200 milliseconds
      timer(200).pipe(take(1)).subscribe(() => {
        // Implement navigation to the user's detail page
        const userId = Number(this.searchQuery);
        
        // Navigate to the user's detail page if the user ID is valid
        if (!isNaN(userId) && userId < 7 && userId > 0) {
          this.progressValue = 0;
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
        } else {
          console.error('Invalid user ID.');
          // Optionally, handle invalid ID (show a message, clear input, etc.)
        }
      });
    }
  }
}
