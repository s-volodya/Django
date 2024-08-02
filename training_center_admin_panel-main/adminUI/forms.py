from.models import Subjects,Language,Componet,Lesonss
from django.forms import ModelForm,TextInput,FileField,CharField,Textarea

class SubjectsForm(ModelForm):
    class Meta:
        model=Subjects
        fields=['name']
        widgets={
            'name':TextInput(attrs={
                "class":'form-control',
                'placeholder':"Subjects Name"
            })

        }
class LanguagesForm(ModelForm):
    class Meta:
        model=Language
        fields=['name1',]
        exclude = ("parentSubject",'parent_admin')

        widgets={'name1':TextInput(attrs={
            "class":'form-control',
            'placeholder':"Sections Name"
        }
        ),}

class ComponentForm(ModelForm):
    class Meta:
        model=Componet
        fildes=['component_name']
        exclude = ("languages",'parent_admin')
        widgets={'component_name':TextInput(attrs={
            "class":'form-control',
            'placeholder':"Elements Name"
        }
        ), }


class LesonssForm(ModelForm):
 
    class Meta:
        model=Lesonss
        fildes=["name","Description","file"]
        exclude=("language",'parent_admin')
        widgets={'name':Textarea(attrs={
            "class":'form-control',
            'placeholder':"New lesson name",
            'rows':3

        }
        ), "Description":Textarea(attrs={
            "class": 'form-control',
            'placeholder': "Description",
            'rows':3

        }),

        }
    def __init__(self, *args, **kwargs):
        super(LesonssForm, self).__init__(*args, **kwargs)
        self.fields['file'].required = False


