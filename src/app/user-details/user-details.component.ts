import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  progressValue = 0;
  message = '';
  user: any;
  isLoading = true;

  constructor( 
    private route: ActivatedRoute,
    private router: Router, // Add the Router service
    private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
        this.userService.getUser(+userId).subscribe(data => {
        this.user = data.data;
        this.isLoading = false;
      });
    }
  }

  goBack() {
    if(Number(localStorage.getItem("search")) < 7){
      this.progressValue = 0;
      this.message = '';

      this.isLoading = true;
      // Simulate a process with a progress bar
      interval(100)
        .pipe(takeWhile(() => this.progressValue < 100))
        .subscribe(() => {
          this.progressValue += 10; // Increment the progress
          if (this.progressValue >= 100) {
            this.completeAction();
          }
      });
  
    }else{
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
  
    }
  }

  completeAction(){
    this.router.navigate(['/']);
  }
  
  completeAction1(){
    this.router.navigate(['/page2']);
    // Navigate back to the root or user list page2
  }
}
