#include <bits/stdc++.h>
using namespace std;
 
class node{
     public:
     int data;
     node *next;
     node(int data){
          this->data = data;
          next = NULL;
     }
};

void print(node *head){
     node *temp = head;
     cout<<"Printing the list"<<endl;
     while(temp != NULL){
     cout<<temp->data<<"->";
     temp = temp->next;
     }
     cout<<"NULL"<<endl;

}

node* takeInput(){
     cout<<"Enter the elements"<<endl;
     int data;
     cin>>data;
     node *head = NULL;
     while(data != -1){
          node *newNode = new node(data);

          if(head == NULL){
             head = newNode;
          }else{
               node *temp = head;
               while(temp->next != NULL){
                  temp =  temp->next;
               }
               temp->next = newNode;
          }

          cin>>data;
     }
     return head;
}

 bool hasCycle(node *head) {
        node* temp = head;
        map<node* , int> m;
        
        while(temp!=NULL){
            m[temp]++;
            
            if(m[temp]>1){
                return true;
                    break;
            }
            temp = temp->next;
        }
        return false;
}

int main(){
     cout<<"Enter -1 for NULL"<<endl;
     node* head = takeInput();
     print(head);
     cout<<hasCycle(head);
return 0;
}