# all the possible source languages
LANGUAGE_DICT = ["it", "en", "es"]
# all the possible signed languages
SIGNED_LANGUAGES_DICT = ["ase", "ise", "bfi", "ssp"]
# sign.mt url for translate text to a pose
TEXT_TO_SIGNED_BASE_URL = (
    "https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose"
)

CHATGPT_MODEL = 'gpt-3.5-turbo'

# set of sentences for sign to text translation
SENTENCES = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "Actions speak louder than words.",
    "Where there's smoke, there's fire.",
    "Every cloud has a silver lining.",
    "Don't count your chickens before they hatch.",
    "All that glitters is not gold.",
    "The early bird catches the worm.",
    "When in Rome, do as the Romans do.",
    "Two wrongs don't make a right.",
    "Better late than never.",
    "A picture is worth a thousand words.",
    "You can't judge a book by its cover.",
    "When the going gets tough, the tough get going.",
    "Honesty is the best policy.",
    "The pen is mightier than the sword.",
    "Actions speak louder than words.",
    "Where there is a will, there is a way.",
    "Fortune favors the bold.",
    "Rome wasn't built in a day.",
]
