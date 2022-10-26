#include <bits/stdc++.h>
using namespace std;

 int longestPalindrome(string s) {
        map<char,int> m;
        for(int i=0; i<s.size(); i++) m[s[i]]++;
        
        int cnt=0;
        for(auto i:m) {
            if(i.second%2!=0) cnt++;
        }
        if(cnt>1) return s.size()-cnt+1;
        return s.size();
}

int main(){
     string s = "cbbd";
     cout<<longestPalindrome(s);
return 0;
}